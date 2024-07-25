from flask import Flask, jsonify
import oracledb

app = Flask(__name__)


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
        # Obtener todas las preguntas ordenadas por dificultad y categoría
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

            # Obtener las opciones para la pregunta actual
            cursor.execute("SELECT * FROM Opciones WHERE Pregunta_ID = :id", {'id': pregunta_id})
            opciones = cursor.fetchall()

            opciones_list = []
            for opcion in opciones:
                opciones_list.append({
                    'texto': opcion[2],
                    'es_correcta': opcion[3]
                })

            result.append({
                'id': pregunta_id,
                'texto': texto,
                'dificultad': dificultad,
                'categoria': categoria,
                'opciones': opciones_list
            })

        return jsonify(result)
    except Exception as e:
        return str(e), 500
    finally:
        cursor.close()
        connection.close()


if __name__ == '__main__':
    app.run(debug=True)
