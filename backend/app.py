import os

import oracledb
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)

# Configura la carpeta de uploads
UPLOAD_FOLDER = 'C:/projects/AskMeInformMe/backend/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/uploads/<filename>')
def get_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# Configura la conexión a la base de datos
def get_db_connection():
    connection = oracledb.connect(
        user='askme',
        password='askme',
        dsn='localhost:1522/orcl'
    )
    return connection


# Endpoint para obtener las preguntas con sus opciones, ordenadas por dificultad
@app.route('/get_questions', methods=['GET'])
def get_questions():
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        query = """
            SELECT p.ID, p.Texto, p.Dificultad, p.Categoria 
            FROM Preguntas p
            ORDER BY 
                CASE 
                    WHEN p.Dificultad = 'Fácil' THEN 1
                    WHEN p.Dificultad = 'Media' THEN 2
                    WHEN p.Dificultad = 'Difícil' THEN 3
                END,
                p.Categoria
        """
        cursor.execute(query)
        preguntas = cursor.fetchall()

        result = []
        for pregunta in preguntas:
            pregunta_id = pregunta[0]
            texto = pregunta[1]
            dificultad = pregunta[2]
            categoria = pregunta[3]

            cursor.execute("SELECT ID, Texto, Es_Correcta FROM Opciones WHERE Pregunta_ID = :id", {'id': pregunta_id})
            opciones = cursor.fetchall()

            opciones_list = []
            for opcion in opciones:
                opciones_list.append({
                    'ID': opcion[0],
                    'Texto': opcion[1],
                    'Es_Correcta': opcion[2]
                })

            result.append({
                'ID': pregunta_id,
                'Texto': texto,
                'Dificultad': dificultad,
                'Categoria': categoria,
                'opciones': opciones_list
            })

        return jsonify(result)
    except Exception as e:
        return str(e), 500
    finally:
        cursor.close()
        connection.close()


# Endpoint para registrar un usuario
@app.route('/register_user', methods=['POST'])
def register_user():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    name = request.form.get('name')

    if not name or file.filename == '':
        return jsonify({'error': 'Name and image are required'}), 400

    if file:
        # Guarda el archivo en el directorio de uploads
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        connection = get_db_connection()
        cursor = connection.cursor()

        try:
            cursor.execute("""
                INSERT INTO Usuarios (Nombre, RutaImagen) 
                VALUES (:1, :2)
            """, (name, filename))
            connection.commit()
            return jsonify({'message': 'User registered successfully'}), 201
        except Exception as e:
            return str(e), 500
        finally:
            cursor.close()
            connection.close()


@app.route('/login_user', methods=['POST'])
def login_user():
    data = request.get_json()
    user_name = data.get('name')

    if not user_name:
        return jsonify({'error': 'Name is required'}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("""
            SELECT Nombre, RutaImagen
            FROM Usuarios
            WHERE Nombre = :1
        """, (user_name,))

        result = cursor.fetchone()
        if result:
            name, image_path = result
            image_url = f'/uploads/{image_path}'
            return jsonify({'name': name, 'imagePath': image_url}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return str(e), 500
    finally:
        cursor.close()
        connection.close()


if __name__ == '__main__':
    app.run(debug=True)
