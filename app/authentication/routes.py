from forms import UserLoginForm
from models import User, supabase
from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    form = UserLoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        wallet_address = form.wallet_address.data

        if User.email_exists(email):
            flash('Email address already in use. Please use a different email.', 'error')
            return redirect(url_for('site.home'))

        user = User.create(email, password, wallet_address=wallet_address)
        if user:
            login_user(user)
            flash('You have successfully created a user account', 'User-created')
            return redirect(url_for('site.home'))
        else:
            flash('User creation failed', 'error')

    return render_template('site.home', form=form)

@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    form = UserLoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        response = supabase.table('users').select('*').eq('email', email).execute()
        if len(response.data) > 0:
            user_data = response.data[0]
            if check_password_hash(user_data['password'], password):
                user = User(user_data['id'], user_data['email'])
                login_user(user)

                flash('Signed in successfully', 'success')
                return redirect(url_for('site.home'))

        flash('Invalid email or password', 'auth-failed')

    return render_template('site.home', form=form)

@auth.route('/delete_account', methods=['POST'])
@login_required
def delete_account():
    user_id = current_user.id
    if User.delete(user_id):
        logout_user()
        flash('Your account has been successfully deleted.', 'success')
    else:
        flash('Failed to delete your account. Please try again.', 'error')
    return redirect(url_for('site.home'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('site.home'))