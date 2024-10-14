from flask import Blueprint

from .test import testRoute
from .auth import authRoutes

# Crear un blueprint  y registrar las rutas
RaizBlueprint = Blueprint('Raiz', __name__)



RaizBlueprint.register_blueprint(testRoute, url_prefix='/test')
RaizBlueprint.register_blueprint(authRoutes, url_prefix='/auth')

@RaizBlueprint.route('/', methods=['GET'])
def Raiz():
    return "Hello Word"