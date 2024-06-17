from flask_login import UserMixin
from supabase import create_client, Client
from config import Config
from werkzeug.security import generate_password_hash

supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

class User(UserMixin):
    def __init__(self, id, email):
        self.id = id
        self.email = email

    def get(user_id):
        response = supabase.table('users').select('*').eq('id', user_id).execute()
        if len(response.data) > 0:
            user_data = response.data[0]
            return User(user_data['id'], user_data['email'])
        return None

    def create(email, password):
        hashed_password = generate_password_hash(password)
        response = supabase.table('users').insert({
            'email': email,
            'password': hashed_password
        }).execute()
        if len(response.data) > 0:
            user_data = response.data[0]
            return User(user_data['id'], user_data['email'])
        return None