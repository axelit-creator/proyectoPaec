import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from app.routes.grafica_routes import grafica_bp

load_dotenv()

app = Flask(__name__)

allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "https://equipo-7.onrender.com",
    "https://equipo-7-servicios.onrender.com"
]

CORS(app, origins=allowed_origins, supports_credentials=True)

app.register_blueprint(grafica_bp, url_prefix='/api/grafica')

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Ruta no encontrada'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Error interno del servidor'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
