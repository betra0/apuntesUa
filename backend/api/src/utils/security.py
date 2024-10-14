import jwt
from functools import wraps
from flask import request, jsonify
import datetime
from datetime import datetime, timedelta, UTC
import traceback
from models.usermodel import ModelUser
from config import Config



class SecurityToken():


    @classmethod
    def generateAccessToken(self, id):
        expiration_date = datetime.now(UTC) + timedelta(hours=Config.accessExpirationHours  , minutes=0)
        payload ={'user_id': id, 'exp': expiration_date,}
        
        token = jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')
        return token
    
    
    @classmethod
    def token_required(self, f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.cookies.get('auth_token')

            if not token: 
                return jsonify({'message': 'no hay token!',
                                'active': -1}), 401

            try:
                
                payload = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
                try:
                    user = ModelUser.get_by_id(payload['user_id'])
                except Exception as e:
                    
                    traceback.print_exc()
                    return jsonify({'error':str(e)}), 500
                if user == None:
                    return jsonify({'message': ' Usuario no valido!',
                                'active': -1}), 401
                return f(user, *args, **kwargs)
            except jwt.ExpiredSignatureError:   
                return jsonify({'message': 'Token has expired!',
                                'active': 0}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Token is invalid!',
                                'active': 0}), 401

        return decorated