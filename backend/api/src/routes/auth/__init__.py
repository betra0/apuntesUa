
from flask import Blueprint

from .google import googleRoutes

# Crear un blueprint  y registrar las rutas
authRoutes = Blueprint('authRoutes', __name__)



authRoutes.register_blueprint(googleRoutes, url_prefix='/google')
#authRoutes.register_blueprint(testRoute, url_prefix='/auth')

@authRoutes.route('/', methods=['GET'])
def Raiz():
    return "Hello Word"