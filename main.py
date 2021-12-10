import os
from flask import Flask, flash, render_template, request, send_file, send_from_directory, url_for
from flask_uploads import UploadSet, configure_uploads
from werkzeug.utils import redirect, secure_filename
from markupsafe import escape

# we need to find ffmpeg before we can import moviepy
import os
# point to ffmpeg with environment variable
print('OS Detected: ', os.name)
if os.name == 'posix':
    os.environ["IMAGEIO_FFMPEG_EXE"] = '/usr/bin/ffmpeg'
# elsif os.name == 'nt' # windows equivalent.
from moviepy.editor import * # TODO remove star import when we know the specific modules we need.
# from moviepy import VideoFileClip 

app = Flask(__name__)
extensions = ('mp4')  # restricting to mp4 for now. If updating this, also update HTML
videos = UploadSet("videos", extensions)
app.config["UPLOADED_VIDEOS_DEST"] = "static/uploads"
app.config["SECRET_KEY"] = os.urandom(24)
configure_uploads(app, videos)


@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST' and 'video' in request.files:
        try:
            video = request.files['video']
            videoname = secure_filename(video.filename)
            videos.save(video)
            flash("Video " + videoname + " uploaded successfully.")
            return render_template('index.html', uploaded_video=escape(videoname))
        except:
            flash("Incorrect file type. Please upload an MP4 file.")
            return render_template('index.html')
    flash("Please upload an MP4 file to get started.")
    return render_template('index.html')


@app.route('/uploads/<filename>')
def send_uploaded_file(filename=''):
    return send_from_directory(app.config["UPLOADED_VIDEOS_DEST"], escape(filename))


@app.route('/uploads/<filename>', methods=['POST'])
def download_file(filename=''):
    return send_from_directory(app.config["UPLOADED_VIDEOS_DEST"], filename, as_attachment=True)


@app.route('/about')
def about():
    return render_template('about.html')


# take in two markers and the filename to edit
# trims video to between start and stop.
@app.route('/trim/<filename>', methods=['POST'])
def trim(filename):
    start = request.form.get("trimMark1")
    stop = request.form.get("trimMark2")
    path_filename = app.config['UPLOADED_VIDEOS_DEST'] + '/' + filename
    video_clip = VideoFileClip(path_filename)
    video_clip = video_clip.subclip(start, stop)
    video_clip.write_videofile(path_filename)  # defaults to rewriting the file
    video_clip.close()
    flash("Video trimmed to selection")
    return render_template('index.html', uploaded_video=escape(filename))


# take in two markers and the filename to edit
# clips out video between marks and concatonates remaining video
@app.route('/delete/<filename>', methods=['POST'])
def delete(filename):
    start = request.form.get("deleteMark1")
    stop = request.form.get("deleteMark2")
    print("start ", start)
    print("stop ", stop)
    path_filename = app.config['UPLOADED_VIDEOS_DEST'] + '/' + filename
    video_clip = VideoFileClip(path_filename)
    video_clip = video_clip.set_start(start)
    video_clip = video_clip.set_end(stop)
    video_clip.write_videofile(path_filename)  # defaults to rewriting the file
    video_clip.close()
    flash("Selection deleted from video")
    return render_template('index.html', uploaded_video=escape(filename))
