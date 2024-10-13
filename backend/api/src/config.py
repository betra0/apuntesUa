import os
from dotenv import load_dotenv


rutasrc= os.path.abspath(os.path.dirname(__file__), )
rutaraiz= os.path.join(rutasrc, "..")
if not os.getenv('DOCKER'):
    print('Load_dotENV:', load_dotenv(dotenv_path=os.path.join(rutaraiz, ".env")))
class Config:
    tokenGoogleUrl = os.getenv('GOOGLE_OAUTH_TOKEN_URL')
    tokenGoogleUrlInfo = os.getenv('GOOGLE_OAUTH_USERINFO_URL')
    googleClientId=os.getenv('GOOGLE_CLIENT_ID')
    googleClientSecret=os.getenv('GOOGLE_CLIENT_SECRET')
    redirectUri=os.getenv('REDIRECT_URI')
    
    tokenExpirationDays = int(os.getenv('TOKEN_EXPIRATION_DAYS', 30))
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret')
    email_log = os.getenv('EMAIL_LOG', 'False').lower() == 'true'  # Convertir a booleano
    email = {
        'mail': os.getenv('EMAIL_MAIL'),
        'token': os.getenv('EMAIL_TOKEN'),
    }
    rutalog = os.getenv('RUTA_LOG')
    rutatesisfile = os.getenv('RUTA_TESIS_FILE')