import os
import requests
from flask import Flask, request, jsonify
from config import Config
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
print(Config.googleClientId, Config.googleClientSecret)
@app.route('/auth/google', methods=['POST'])
def auth_google():
    code = request.json.get('code')

    # URL para intercambiar el código por un token
    token_url = Config.tokenGoogleUrl

    # Datos para la solicitud de intercambio de token
    data = {
        'code': code,
        'client_id': Config.googleClientId,
        'client_secret': Config.googleClientSecret,
        'redirect_uri': Config.redirectUri,
        'grant_type': 'authorization_code'
    }

    # Solicitud a Google para obtener el access token
    response = requests.post(token_url, data=data)
    token_data = response.json()
    

    if 'access_token' in token_data:
        access_token = token_data['access_token']
        # Usar el access token para obtener los datos del usuario
        user_info_url = Config.tokenGoogleUrlInfo
        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        # Solicitud a Google para obtener la información del usuario
        user_info_response = requests.get(user_info_url, headers=headers)
        user_info = user_info_response.json()

        return jsonify({
            'access_token': access_token,
            'refresh_token': token_data.get('refresh_token'),
            'user_info': user_info
        })
    
    else:
        return jsonify({'error': 'Failed to retrieve access token'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)