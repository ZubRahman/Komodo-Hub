from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Index.html')

@app.route('/aboutus')
def aboutus():
    return render_template('about.html',methods=['GET','POST'])

if __name__ == '__main__':
    app.run(debug=True)