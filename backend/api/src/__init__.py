import os
import requests
from flask import Flask, request, jsonify
from config import Config
from flask_cors import CORS
from models.usermodel import ModelUser
from models.entities.user import User

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
    

    if not 'access_token' in token_data:
       return jsonify({'error': 'Failed to retrieve access token'}), 400
    
    if not 'refresh_token' in token_data:
        return jsonify({'error': 'Failed to retrieve refresh token '}), 400
        
    access_tokenG = token_data['access_token']
    refresh_tokenG = token_data['refresh_token']
    # Usar el access token para obtener los datos del usuario
    user_info_url = Config.tokenGoogleUrlInfo
    headers = {
        'Authorization': f'Bearer {access_tokenG}'
    }
    # Solicitud a Google para obtener la información del usuario
    user_info_response = requests.get(user_info_url, headers=headers)
    user_info = user_info_response.json()
    if not user_info :
        return jsonify({
        'success': False, 'message':'ERROR AL  RECUPERAR LA INFO DEL USER'
    })

    # Verificar que los campos necesarios estén presentes
    required_fields = ['email', 'given_name', 'family_name', 'name', 'picture', 'sub']
    missing_fields = [field for field in required_fields if field not in user_info]

    if missing_fields:
        return jsonify({
            'success': False, 
            'message': f'Missing fields: {", ".join(missing_fields)}'
        })
    
    user = ModelUser.get_by_id(user_info['sub'])
    if not user:
        print('CREANDO AL USUARIO ')
        
        ModelUser.createUser(
                    User(
                    id=user_info['sub'],                             
                    email=user_info['email'],                       
                    full_name=user_info['name'],               
                    first_name=user_info['given_name'],            
                    last_name=user_info['family_name'],             
                    profile_picture=user_info['picture'],                 
                    google_refresh_token=refresh_tokenG,  #  el token de actualización
                    is_active=1
                    )
        )
        user = ModelUser.get_by_id(user_info['sub'])
    else:
        print('EL USUARIO YA EXISTE')
        
    #crear token de secion (pendiente)

    return jsonify({'success':True, 'data':{'user':user.getdict()}}), 200 
   
        
    """ return jsonify({
        'access_token': access_token,
        'refresh_token': token_data.get('refresh_token'),
        'user_info': user_info
    }) """
    


if __name__ == '__main__':
    app.run(debug=True, port=5000)