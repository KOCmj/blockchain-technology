from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField 
from wtforms.validators import DataRequired, Email, Length, Optional

class UserLoginForm(FlaskForm):
    email = StringField('Email', validators = [DataRequired(), Email()])
    password = PasswordField('Password', validators = [DataRequired(), Length(min=6)])
    wallet_address = StringField('Wallet Address')
    submit_button = SubmitField()

class UserUpdateForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('New Password (leave blank to keep current)', validators=[Optional(), Length(min=6)])
    wallet_address = StringField('Wallet Address')
    submit_button = SubmitField('Update Profile')