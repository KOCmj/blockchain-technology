from flask import Flask
from .site.routes import site
from .authentication.routes import auth
from supabase import create_client, Client
from config import Config
from flask_login import LoginManager
from models import User



supabase = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)


from .api.routes import api
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


app.register_blueprint(site)
app.register_blueprint(auth)
app.register_blueprint(api, url_prefix='/api')
# app.register_blueprint(api)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

app.config.from_object(Config)


if __name__ == '__main__':
    app.run(debug=True)