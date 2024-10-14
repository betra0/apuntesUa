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
    
    accessExpirationHours = float(os.getenv('TOKEN_EXPIRATION_HOURS', 2))
    refreshExpirationDays = float(os.getenv('TOKEN_EXPIRATION_DAYS', 180))
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret')
    email_log = os.getenv('EMAIL_LOG', 'False').lower() == 'true'  # Convertir a booleano
    email = {
        'mail': os.getenv('EMAIL_MAIL'),
        'token': os.getenv('EMAIL_TOKEN'),
    }
    rutalog = os.getenv('RUTA_LOG')
    rutatesisfile = os.getenv('RUTA_TESIS_FILE')

def getconfig_bd():
        return {
            'host': os.getenv('DB_HOST', 'localhost'),
            'user': os.getenv('DB_USER', 'dany'),
            'port': os.getenv('DB_PORT', 3306),
            'password': os.getenv('DB_PASSWORD', '12345'),
            'database':os.getenv('DB', 'ua_apuntes'),
            }