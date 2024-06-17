from flask import Blueprint, render_template
import random
from forms import UserLoginForm




site = Blueprint('site', __name__, static_folder='static', template_folder='site_templates')

@site.route('/')
def home():
    form = UserLoginForm()

    image_filenames = [
        '1.JPEG', '2.PNG', '3.PNG', '4.JPEG', '5.PNG', '6.PNG', '7.PNG', '8.PNG', '9.PNG', '10.PNG',
        '11.PNG', '12.JPEG', '13.JPEG', '14.JPEG', '15.JPEG', '16.JPEG', '17.JPEG', '18.JPEG', '19.JPEG', '20.JPEG',
        '21.JPEG', '22.JPEG', '23.JPEG', '24.JPEG', '25.JPEG', '26.JPEG', '27.JPEG', '28.JPEG', '29.JPEG', '30.JPEG',
        '31.JPEG', '32.JPEG', '33.jpeg', '34.JPEG', '35.JPEG', '36.JPEG', '37.JPEG', '38.JPEG', '39.JPEG', '40.JPEG',
        '41.JPEG', '42.JPEG', '43.JPEG', '44.PNG', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg', '50.jpg',
        '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.JPEG', '59.JPEG', '60.JPEG',
        '61.JPEG', '62.JPEG', '63.JPEG', '64.JPEG', '65.JPEG', '66.JPEG', '67.JPEG', '68.GIF', '69.jpg', '70.jpg'
    ]
    
    random.shuffle(image_filenames)
    
    images = image_filenames[:70]
    

    return render_template('index.html', images=images, form=form)

@site.route('/redesign')
def redesign():
    form = UserLoginForm()

    return render_template('redesign.html', form=form)

@site.route('/nat')
def nat():
    form = UserLoginForm()

    return render_template('nat.html', form=form)

@site.route('/learn')
def learn():
    form = UserLoginForm()

    return render_template('learn.html', form=form)

@site.route('/expansion')
def expand():
    form = UserLoginForm()

    return render_template('expansion.html', form=form)