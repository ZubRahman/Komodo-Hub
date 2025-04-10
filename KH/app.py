from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import os
from werkzeug.utils import secure_filename
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'komodo_hub_secret_key'
# Increase session lifetime
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)  # 24 hours

# Configure upload folder
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

DB_FILE = "users.db"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def init_db():
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                user_type TEXT NOT NULL
            )
        ''')
        conn.commit()

# Before request handler to check session
@app.before_request
def before_request():
    # Make session permanent to prevent it from expiring when browser is closed
    session.permanent = True
    
    # Print session data for debugging
    # print("Current session:", dict(session))

# Context processor to make session data available to all templates
@app.context_processor
def inject_user():
    return {
        'session': session,
        'user_id': session.get('id'),
        'user_type': session.get('user_type', 'user'),
        'email': session.get('email')
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/species')
def species():
    return render_template('species.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        flash('Thank you for your message! We will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/logout')
def logout():
    # Clear all session data
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # Special case for admin
        if email == "admin@gmail.com" and password == "admin123":
            session.clear()  # Clear any existing session data
            session['logged_in'] = True
            session['email'] = email
            session['id'] = 0  # Special ID for admin
            session['user_type'] = 'admin'  # Explicitly set user_type
            flash("Admin login successful!", "success")
            return redirect(url_for('admin'))

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and check_password_hash(user["password"], password):
            session.clear()  # Clear any existing session data
            session['logged_in'] = True
            session['email'] = email
            session['id'] = user['id']
            session['user_type'] = user['user_type']  # Store user_type in session
            session['first_name'] = user['first_name']  # Store first_name for personalized greeting
            flash("Login successful!", "success")
            
            # Redirect based on user type
            if user['user_type'] == 'student':
                return redirect(url_for('student'))
            elif user['user_type'] == 'teacher':
                return redirect(url_for('teacher'))
            else:
                return redirect(url_for('index'))
        else:
            flash("Invalid credentials.", "danger")
    
    return render_template('login.html')

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        password = request.form.get('password')
        user_type = request.form.get('user_type')

        if not all([first_name, last_name, email, password, user_type]):
            flash("All fields are required!", "danger")
            return redirect(url_for('signup'))

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            password_hash = generate_password_hash(password, method='pbkdf2:sha256')
            cursor.execute('''
                INSERT INTO users (first_name, last_name, email, password, user_type) 
                VALUES (?, ?, ?, ?, ?)
            ''', (first_name, last_name, email, password_hash, user_type))
            conn.commit()
            conn.close()
            flash('Account created successfully! You can now log in.', 'success')
            return redirect(url_for('login'))
        except Exception:
            flash("Error saving to database!", "danger")
    return render_template('signup.html')

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        
        if not email:
            flash("Email address is required!", "danger")
            return redirect(url_for('forgot_password'))
        
        # Check if the email exists in the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()
        
        if user:
            # In a real application, you would generate a token and send an email
            # For this demo, we'll just show a success message
            flash("If an account exists with that email, you will receive password reset instructions.", "success")
        else:
            # Don't reveal that the email doesn't exist for security reasons
            flash("If an account exists with that email, you will receive password reset instructions.", "success")
        
        return redirect(url_for('login'))
    
    return render_template('forgot_password.html')

@app.route('/komodo-wordle')
def komodo_wordle():
    return render_template('komodo_wordle.html')

@app.route('/komodo-quiz')
def komodo_quiz():
    return render_template('komodo_quiz.html')

@app.route('/reports-sightings', methods=['GET', 'POST'])
def reports_sightings():
    if request.method == 'POST':
        if 'photo' in request.files:
            photo = request.files['photo']
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)
                photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Thank you for your submission! Your sighting has been recorded.', 'success')
        return redirect(url_for('reports_sightings'))
    return render_template('report-sighting.html')

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy.html')

@app.route('/privacy')
def privacy_redirect():
    return redirect(url_for('privacy_policy'))

@app.route('/terms-of-service')
def terms_of_service():
    return render_template('terms_of_service.html')

@app.route('/account')
def account():
    if not session.get('logged_in'):
        flash('You must be logged in to view your account.', 'danger')
        return redirect(url_for('login'))
    return render_template('account.html')

@app.route('/student')
def student():
    if not session.get('logged_in'):
        flash('You must be logged in to view your student dashboard.', 'danger')
        return redirect(url_for('login'))
    
    if session.get('user_type') != 'student':
        flash('Access denied. This page is for students only.', 'danger')
        return redirect(url_for('index'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (session['id'],))
    user = cursor.fetchone()
    conn.close()
    
    # Get game scores
    game_scores = []
    highest_score = 0
    average_score = 0
    total_games = 0
    
    try:
        # Print debug info
        # print(f"Fetching scores for user_id: {session['id']}")
        
        conn = sqlite3.connect("gamescore.db")
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Check if the user has any scores
        cursor.execute("SELECT COUNT(*) as count FROM scores WHERE user_id = ?", (session['id'],))
        count = cursor.fetchone()['count']
        # print(f"Found {count} scores for user_id: {session['id']}")
        
        # Get all scores for the current user
        cursor.execute("""
            SELECT score, created_at, 
            CASE 
                WHEN score <= 10 THEN 'Quiz'
                ELSE 'Wordle'
            END as game_type
            FROM scores 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        """, (session['id'],))
        
        game_scores = cursor.fetchall()
        total_games = len(game_scores)
        
        if total_games > 0:
            # Get highest score
            cursor.execute("SELECT MAX(score) as max_score FROM scores WHERE user_id = ?", (session['id'],))
            highest_score = cursor.fetchone()['max_score']
            
            # Get average score
            cursor.execute("SELECT AVG(score) as avg_score FROM scores WHERE user_id = ?", (session['id'],))
            average_score = round(cursor.fetchone()['avg_score'], 1)
            
            # Print the scores for debugging
            # print(f"Highest score: {highest_score}")
            # print(f"Average score: {average_score}")
            # print(f"Total games: {total_games}")
            # print("Game scores:")
            # for score in game_scores:
            #     print(f"  Score: {score['score']}, Date: {score['created_at']}, Type: {score['game_type']}")
        
        conn.close()
    except Exception as e:
        print(f"Error fetching game scores: {e}")
        import traceback
        traceback.print_exc()
    
    return render_template('student.html', 
                          user=user, 
                          game_scores=game_scores,
                          highest_score=highest_score,
                          average_score=average_score,
                          total_games=total_games)

@app.route('/update_student_account', methods=['POST'])
def update_student_account():
    if not session.get('logged_in') or session.get('user_type') != 'student':
        flash('Access denied.', 'danger')
        return redirect(url_for('login'))
    
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    new_password = request.form.get('new_password')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Update user information
    if first_name:
        cursor.execute("UPDATE users SET first_name = ? WHERE id = ?", (first_name, session['id']))
        # Update session data
        session['first_name'] = first_name
    if last_name:
        cursor.execute("UPDATE users SET last_name = ? WHERE id = ?", (last_name, session['id']))
    if email:
        cursor.execute("UPDATE users SET email = ? WHERE id = ?", (email, session['id']))
        # Update session data
        session['email'] = email
    if new_password:
        hashed_password = generate_password_hash(new_password)
        cursor.execute("UPDATE users SET password = ? WHERE id = ?", (hashed_password, session['id']))
    
    conn.commit()
    conn.close()
    
    flash('Your account has been updated successfully!', 'success')
    return redirect(url_for('student'))

@app.route("/save_score", methods=["POST"])
def save_score():
    if "id" not in session:
        print("User not logged in, cannot save score")
        return jsonify({"success": False, "message": "User not logged in"}), 401
    
    try:
        data = request.json
        score = data.get("score", 0)
        user_id = session["id"]
        
        # print(f"Saving score {score} for user_id {user_id}")
        
        # Make sure gamescore.db exists and has the correct table
        conn = sqlite3.connect("gamescore.db")
        cursor = conn.cursor()
        
        # Check if scores table exists, if not create it
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='scores'")
        if not cursor.fetchone():
            # print("Creating scores table")
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    score INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
        
        # Insert the score
        cursor.execute("INSERT INTO scores (user_id, score) VALUES (?, ?)", (user_id, score))
        conn.commit()
        
        # Verify the score was saved
        cursor.execute("SELECT * FROM scores WHERE user_id = ? ORDER BY id DESC LIMIT 1", (user_id,))
        saved_score = cursor.fetchone()
        # print(f"Saved score: {saved_score}")
        
        conn.close()
        
        return jsonify({"success": True, "message": "Score saved successfully"}), 200
    except Exception as e:
        print(f"Error saving score: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "message": f"Error: {str(e)}"}), 500

def get_users():
    conn = get_db_connection()
    query = 'SELECT id, first_name, last_name FROM users'
    users = conn.execute(query).fetchall()
    conn.close()
    return users

def get_highest_scores():
    conn = sqlite3.connect('gamescore.db')
    conn.row_factory = sqlite3.Row
    query = '''
        SELECT id, MAX(score) AS highest_score
        FROM scores
        GROUP BY id
    '''
    scores = conn.execute(query).fetchall()
    conn.close()
    return scores

@app.route('/leaderboard')
def leaderboard():
    users = get_users()
    scores = get_highest_scores()
    score_dict = {score['id']: score['highest_score'] for score in scores}

    leaderboard_data = []
    for user in users:
        user_score = score_dict.get(user['id'])
        if user_score is not None:
            leaderboard_data.append({
                'rank': len(leaderboard_data) + 1,
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                'highest_score': user_score
            })

    leaderboard_data.sort(key=lambda x: x['highest_score'], reverse=True)
    return render_template('leaderboard.html', leaderboard=leaderboard_data)

@app.route('/admin')
def admin():
    # Check if user is admin
    if session.get('email') != 'admin@gmail.com':
        flash('Access denied', 'danger')
        return redirect(url_for('login'))

    # Print session data for debugging
    # print("Admin route - Session data:", dict(session))

    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    
    return render_template('admin.html', users=users)

@app.route('/delete_user/<int:user_id>', methods=['POST'])
def delete_user(user_id):
    if session.get('email') != 'admin@gmail.com':
        flash('Unauthorized action.', 'danger')
        return redirect(url_for('login'))

    conn = get_db_connection()
    conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
    conn.commit()
    conn.close()
    flash(f'User with ID {user_id} has been deleted.', 'success')
    return redirect(url_for('admin'))

# Add the missing routes
@app.route('/donate')
def donate():
    return render_template('donate.html')

@app.route('/volunteer')
def volunteer():
    return render_template('volunteer.html')

@app.route('/teacher')
def teacher():
    if not session.get('logged_in'):
        flash('You must be logged in to view your teacher dashboard.', 'danger')
        return redirect(url_for('login'))
    
    if session.get('user_type') != 'teacher':
        flash('Access denied. This page is for teachers only.', 'danger')
        return redirect(url_for('index'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get teacher information
    cursor.execute("SELECT * FROM users WHERE id = ?", (session['id'],))
    user = cursor.fetchone()
    
    # Get all students
    cursor.execute("SELECT * FROM users WHERE user_type = 'student'")
    students = cursor.fetchall()
    
    conn.close()
    
    return render_template('teacher.html', user=user, students=students)

@app.route('/update_teacher_account', methods=['POST'])
def update_teacher_account():
    if not session.get('logged_in') or session.get('user_type') != 'teacher':
        flash('Access denied.', 'danger')
        return redirect(url_for('login'))
    
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    new_password = request.form.get('new_password')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Update user information
    if first_name:
        cursor.execute("UPDATE users SET first_name = ? WHERE id = ?", (first_name, session['id']))
        # Update session data
        session['first_name'] = first_name
    if last_name:
        cursor.execute("UPDATE users SET last_name = ? WHERE id = ?", (last_name, session['id']))
    if email:
        cursor.execute("UPDATE users SET email = ? WHERE id = ?", (email, session['id']))
        # Update session data
        session['email'] = email
    if new_password:
        hashed_password = generate_password_hash(new_password)
        cursor.execute("UPDATE users SET password = ? WHERE id = ?", (hashed_password, session['id']))
    
    conn.commit()
    conn.close()
    
    flash('Your account has been updated successfully!', 'success')
    return redirect(url_for('teacher'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
