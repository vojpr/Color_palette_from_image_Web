from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import extcolors
import PIL

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['UPLOAD_FOLDER'] = "static/uploads/"

App = Flask(__name__)


@app.route("/", methods=['POST', 'GET'])
def home():
    image = None
    error = None
    if request.method == 'POST':
        try:
            # Upload Image
            image = request.files['file']
            filename = secure_filename(image.filename)
            MYDIR = os.path.dirname(__file__)
            image.save(os.path.join(MYDIR + "/" + app.config['UPLOAD_FOLDER'], filename))
            full_image_path = f"static/uploads/{filename}"
            # Get Image colors and pixel count
            img = PIL.Image.open(image)
            colors, pixel_count = extcolors.extract_from_image(img, limit=10, tolerance=15)
            return render_template("index.html", error=error, image=full_image_path, colors=colors, pixel_count=pixel_count)
        except:
            error = "Upload your Image file first"
            return render_template("index.html", error=error, image=image)
    else:
        return render_template("index.html", error=error, image=image)


if __name__ == "__main__":
    app.run()
