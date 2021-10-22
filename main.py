import os
from flask import Flask, flash, render_template, request
from flask_uploads import IMAGES, UploadSet, configure_uploads

app = Flask(__name__)
photos = UploadSet("photos", IMAGES);
app.config["UPLOADED_PHOTOS_DEST"] = "static/uploads"
app.config["SECRET_KEY"] = os.urandom(24)
configure_uploads(app, photos)

@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST' and 'photo' in request.files:
        photos.save(request.files['photo'])
        flash("Photo saved succesfully.")
        return render_template('upload.html')
    return render_template('upload.html')
