
from flask import Blueprint, g, jsonify

from .google import googleRoutes
from utils.security import SecurityToken as Security
from .accessToken import tokenRoute

# Crear un blueprint  y registrar las rutas
authRoutes = Blueprint('authRoutes', __name__)



authRoutes.register_blueprint(googleRoutes, url_prefix='/google')
authRoutes.register_blueprint(tokenRoute, url_prefix='/token')
#authRoutes.register_blueprint(testRoute, url_prefix='/auth')


@authRoutes.route('/', methods=['GET'])
@Security.accessToken_required
def Raiz():
    return jsonify({'user':g.currentUser.getdict()})