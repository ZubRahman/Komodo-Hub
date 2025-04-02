from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Index.html')

@app.route('/aboutus')
def aboutus():
    return render_template('about.html',methods=['GET','POST'])

@app.route('/contactus')
def contactus():
    return render_template('ContactUs.html',methods=['GET','POST'])

@app.route('/login')
def login():
    return render_template('Login.html',methods=['GET','POST'])






# Database connection settings
db = mysql.connector.connect(
    host="localhost",
    user="root",  # Change this if you set a different username
    password="",  # Change this if you set a MySQL password
    database="komodo_hub"
)



@app.route('/submit_form', methods=['POST'])
def submit_form():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    cursor = db.cursor()
    cursor.execute("INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
    db.commit()
    cursor.close()

    return "Message sent successfully!"







if __name__ == '__main__':
    app.run(debug=True)
