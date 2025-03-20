from flask import Flask, render_template, request, redirect, url_for, flash
import os
from werkzeug.utils import secure_filename

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

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/forgot-password')
def forgot_password():
    return render_template('forgot_password.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/kids-games')
def kids_games():
    return render_template('kids_games.html')

@app.route('/conservation-programs')
def conservation_programs():
    return render_template('conservation_programs.html')

@app.route('/schools-communities')
def schools_communities():
    return render_template('schools_communities.html')

@app.route('/learning-resources')
def learning_resources():
    return render_template('learning_resources.html')

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

if __name__ == '__main__':
    app.run(debug=True)

