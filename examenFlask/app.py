from flask import Flask
from flask_cors import CORS
from config import config
from src.database import mysql
from src.blueprints.pedidos.routes import pedidos_bp

app = Flask(__name__)
CORS(app)

app.config.from_object(config['development'])

app.secret_key = 'clave_secreta_examen_pizzeria_2026'

mysql.init_app(app)

app.register_blueprint(pedidos_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)