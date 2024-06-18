from flask_login import UserMixin
from supabase import create_client, Client
from config import Config
from werkzeug.security import generate_password_hash

supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

class User(UserMixin):
    def __init__(self, id, email, wallet_address=None):
        self.id = id
        self.email = email
        self.wallet_address = wallet_address


    def get(user_id):
        response = supabase.table('users').select('*').eq('id', user_id).execute()
        if len(response.data) > 0:
            user_data = response.data[0]
            return User(user_data['id'], user_data['email'], user_data.get('wallet_address'))
        return None

    def create(email, password, wallet_address=None):
        hashed_password = generate_password_hash(password)
        user_data = {
            'email': email,
            'password': hashed_password,
        }
        if wallet_address:
            user_data['wallet_address'] = wallet_address
        
        response = supabase.table('users').insert(user_data).execute()
        if len(response.data) > 0:
            user_data = response.data[0]
            return User(user_data['id'], user_data['email'], user_data.get('wallet_address'))
        return None
    
    def update(user_id, email=None, password=None, wallet_address=None):
        update_data = {}
        if email:
            update_data['email'] = email
        if password:
            update_data['password'] = generate_password_hash(password)
        if wallet_address is not None:
            update_data['wallet_address'] = wallet_address
    
        if update_data:
            response = supabase.table('users').update(update_data).eq('id', user_id).execute()
            if len(response.data) > 0:
                user_data = response.data[0]
                return User(user_data['id'], user_data['email'], user_data.get('wallet_address'))
    
        return None