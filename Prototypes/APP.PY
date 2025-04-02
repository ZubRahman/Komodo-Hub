from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
import logging

app = Flask(__name__)
app.secret_key = 'komodo_hub_secret_key'  # Change this in production

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Test user
users = {
    "test@example.com": {
        "password": generate_password_hash("testpassword123"),
        "name": "Test User"
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        user_type = request.form.get('user_type')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # Here you would typically send an email or store the contact form data
        # For now, we'll just flash a message
        flash('Thank you for your message! We will get back to you soon.')
        return redirect(url_for('contact'))
        
    return render_template('contact.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        
        app.logger.debug(f"Signup attempt: email={email}, first_name={first_name}, last_name={last_name}")
        
        if not all([email, password, confirm_password, first_name, last_name]):
            flash('All fields are required', 'error')
            return redirect(url_for('signup'))
        
        if password != confirm_password:
            flash('Passwords do not match', 'error')
            return redirect(url_for('signup'))
        
        if email in users:
            flash('Email already exists', 'error')
            return redirect(url_for('signup'))
        
        users[email] = {
            "password": generate_password_hash(password),
            "name": f"{first_name} {last_name}"
        }
        app.logger.info(f"New user created: {email}")
        flash('Account created successfully', 'success')
        return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = users.get(email)
        if user and check_password_hash(user['password'], password):
            session['user'] = email
            flash('Logged in successfully')
            return redirect(url_for('index'))
        else:
            flash('Invalid email or password')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('Logged out successfully')
    return redirect(url_for('index'))

@app.context_processor
def inject_user():
    return dict(user=session.get('user'), users=users)

if __name__ == '__main__':
    app.run(debug=True)

