import os
from flask import Flask, flash, render_template, request
from flask_uploads import UploadSet, configure_uploads

app = Flask(__name__)
extensions = ('mp4', 'mov', 'mvk')
videos = UploadSet("videos", extensions);
app.config["UPLOADED_VIDEOS_DEST"] = "static/uploads"
app.config["SECRET_KEY"] = os.urandom(24)
configure_uploads(app, videos)

@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST' and 'video' in request.files:
        video = request.files['video']
        videoname = video.filename
        videos.save(video)
        flash("Video " + videoname + " saved successfully.")
        return render_template('index.html')
    return render_template('upload.html')
