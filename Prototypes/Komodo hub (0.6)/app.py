from flask import Flask, render_template, request, redirect, url_for, session, flash
import os
from werkzeug.utils import secure_filename
import sqlite3
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash, generate_password_hash


app = Flask(__name__)
app.secret_key = 'komodo_hub_secret_key'

# Configure upload folder
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Database file
DB_FILE = "users.db"

# Create the database and users table if not exists
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

# Initialize DB when app starts
init_db()


# Routes
@app.route('/')
def index():
  return render_template('index.html')

@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/features')
def features():
  return render_template('features.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
  if request.method == 'POST':
      # Process the form data
      name = request.form.get('name')
      email = request.form.get('email')
      subject = request.form.get('subject')
      message = request.form.get('message')
      inquiry_type = request.form.get('inquiry_type')
      
      # In a real application, you would save this to a database
      # and/or send an email notification
      
      # Flash a success message
      flash('Thank you for your message! We will get back to you soon.', 'success')
      
      # Redirect to avoid form resubmission
      return redirect(url_for('contact'))
  
  # For GET requests, just render the contact page
  return render_template('contact.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('email', None)  # Remove other session data if needed
    flash("You have been logged out.", "info")
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        id = request.form.get('id')

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()

        print("User ID in session:", session.get('id'))

        if user:
            stored_password = user["password"]
            if check_password_hash(stored_password, password):
                flash("Login successful!", "success")
                session['logged_in'] = True  # Set session to indicate user is logged in
                session['email'] = email
                session['id'] = user['id']
                return redirect(url_for('index'))  # Redirect to home or dashboard
            else:
                flash("Invalid password. Please try again.", "danger")
        else:
            flash("Account not found. Please sign up first.", "warning")

    return render_template('login.html')




# Database connection function
def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # Enables column access by name
    return conn

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        print("Signup form submitted!")  # Debugging line
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        password = request.form.get('password')
        id = request.form.get('id')
        user_type = request.form.get('user_type')

        print("Received data:", first_name, last_name, email, password, user_type)  # Debugging line

        if not all([first_name, last_name, email, password, user_type]):
            print("❌ Missing form data")  # Debugging step 3
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

            print("User saved successfully!")  # Debugging line
            flash('Account created successfully! You can now log in.', 'success')
            return redirect(url_for('login'))

        except Exception as e:
            print("Database error:", e)  # Debugging line
            flash("Error saving to database!", "danger")

    return render_template('signup.html')


@app.route('/forgot-password')
def forgot_password():
  return render_template('forgot_password.html')

@app.route('/resources')
def resources():
  return render_template('resources.html')

@app.route('/knowledge-base')
def knowledge_base():
  # Redirect to resources page with knowledge base section
  return redirect(url_for('resources') + '#knowledge-base')

@app.route('/learning-resources')
def learning_resources():
  return render_template('learning_resources.html')

@app.route('/conservation-news')
def conservation_news():
  # Redirect to resources page with conservation news section
  return redirect(url_for('resources') + '#conservation-news')

@app.route('/kids-games')
def kids_games():
  return render_template('kids_games.html')

@app.route('/conservation-programs')
def conservation_programs():
  return render_template('conservation_programs.html')

@app.route('/schools-communities')
def schools_communities():
  return render_template('schools_communities.html')

@app.route('/reports-sightings', methods=['GET', 'POST'])
def reports_sightings():
  if request.method == 'POST':
      # Process form submission
      name = request.form.get('name')
      email = request.form.get('email')
      location = request.form.get('location')
      species = request.form.get('species')
      description = request.form.get('description')
      
      # Handle file upload
      if 'photo' in request.files:
          photo = request.files['photo']
          if photo and allowed_file(photo.filename):
              filename = secure_filename(photo.filename)
              photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
              # Here you would typically save the file path to a database
      
      # In a real application, you would save this data to a database
      flash('Thank you for your submission! Your report has been received.', 'success')
      return redirect(url_for('reports_sightings'))
  
  return render_template('reports_sightings.html')

@app.route('/privacy-policy')
def privacy_policy():
  return render_template('privacy_policy.html')

@app.route('/terms-of-service')
def terms_of_service():
  return render_template('terms_of_service.html')

@app.route('/pricing')
def pricing():
  return render_template('pricing.html')

@app.route('/account')
def account():
  return render_template('account.html')

@app.route('/account_settings', methods=['GET', 'POST'])
def account_settings():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetch user details
    cursor.execute("SELECT * FROM users WHERE id = ?", (session['id'],))
    user = cursor.fetchone()

    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        new_email = request.form.get('email')
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        id = request.form.get('id')

        # Update fields in database
        if first_name:
            cursor.execute("UPDATE users SET first_name = ? WHERE id = ?", (first_name, session['id'],))
        if last_name:
            cursor.execute("UPDATE users SET last_name = ? WHERE id = ?", (last_name, session['id'],))
        if new_email:
            cursor.execute("UPDATE users SET email = ? WHERE id = ?", (new_email, session['id'],))
        if new_password and confirm_password:
            if new_password == confirm_password:
                hashed_password = generate_password_hash(new_password)
                cursor.execute("UPDATE users SET password = ? WHERE id = ?", (hashed_password, session['id'],))
            else:
                return "Passwords do not match!"

        conn.commit()
        conn.close()

        return redirect(url_for('account_settings'))  # Refresh page after update

    return render_template('account_settings.html', user=user)

@app.route('/manage_payments')
def manage_payments():
  return render_template('manage_payments.html')

@app.route('/progress')
def progress():
  return render_template('progress.html')

if __name__ == '__main__':
  app.run(debug=True)

