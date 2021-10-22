from flask import Flask, send_file, render_template

app = Flask(__name__)

@app.route('/')
def download():
    path = "./static/downloads/cringe.jpg"
    return send_file(path, as_attachment=True)
