from flask import Blueprint, request, jsonify, flash, get_flashed_messages
from src.database import mysql
from datetime import datetime

pedidos_bp = Blueprint('pedidos', __name__)

@pedidos_bp.route('/api/flash', methods=['GET'])
def obtener_flash():
    mensajes = get_flashed_messages()
    return jsonify({"mensajes": mensajes}), 200

@pedidos_bp.route('/api/pedidos', methods=['GET'])
def obtener_pedidos():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM pedidos")
        columnas = [col[0] for col in cursor.description]
        pedidos = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]
        cursor.close()
        return jsonify({"mensaje": "Lista de pedidos", "pedidos": pedidos, "exito": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@pedidos_bp.route('/api/pedidos/<int:pedido_id>/detalles', methods=['GET'])
def obtener_detalles(pedido_id):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM detalle_pedidos WHERE pedido_id = %s", (pedido_id,))
        columnas = [col[0] for col in cursor.description]
        detalles = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]
        cursor.close()
        return jsonify({"mensaje": f"Detalles del pedido {pedido_id}", "detalles": detalles, "exito": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@pedidos_bp.route('/api/guardar_pedido', methods=['POST'])
def guardar_pedido():
    try:
        datos = request.json or {}

        requeridos = ['nombre_cliente', 'direccion', 'telefono', 'fecha_pedido', 'total', 'detalles']
        for campo in requeridos:
            if campo not in datos or datos[campo] in (None, ''):
                return jsonify({"error": f"Falta el campo '{campo}'"}), 400

        try:
            fecha_obj = datetime.strptime(str(datos['fecha_pedido']), '%Y-%m-%d')
            if fecha_obj.year > 9999:
                return jsonify({"error": "El año no puede ser mayor a 9999"}), 400
        except ValueError:
            return jsonify({"error": "Formato de fecha inválido. Use YYYY-MM-DD"}), 400

        if not isinstance(datos['detalles'], list) or len(datos['detalles']) == 0:
            return jsonify({"error": "El pedido no contiene pizzas"}), 400

        if float(datos['total']) < 0:
            return jsonify({"error": "El total no puede ser negativo"}), 400

        cursor = mysql.connection.cursor()

        sql_pedido = """
            INSERT INTO pedidos (nombre_cliente, direccion, telefono, fecha_pedido, total)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql_pedido, (
            datos['nombre_cliente'],
            datos['direccion'],
            datos['telefono'],
            datos['fecha_pedido'],
            datos['total']
        ))

        pedido_id = cursor.lastrowid

        sql_detalle = """
            INSERT INTO detalle_pedidos (pedido_id, tamano, ingredientes, num_pizzas, subtotal)
            VALUES (%s, %s, %s, %s, %s)
        """
        for pizza in datos['detalles']:
            if int(pizza.get('num_pizzas', 0)) <= 0:
                mysql.connection.rollback()
                return jsonify({"error": "Cantidad de pizzas inválida"}), 400
            cursor.execute(sql_detalle, (
                pedido_id,
                pizza['tamano'],
                pizza['ingredientes'],
                pizza['num_pizzas'],
                pizza['subtotal']
            ))

        mysql.connection.commit()
        cursor.close()

        mensaje = f'Pedido registrado con éxito. Total a pagar: ${datos["total"]}'
        flash(mensaje)

        return jsonify({"mensaje": mensaje, "exito": True}), 200

    except Exception as e:
        mysql.connection.rollback()
        return jsonify({"error": str(e)}), 400

@pedidos_bp.route('/api/ventas/dia', methods=['GET'])
def ventas_por_dia():
    try:
        dia = request.args.get('dia', type=int)
        if dia is None:
            return jsonify({"error": "Parámetro 'dia' requerido (número)"}), 400

        cursor = mysql.connection.cursor()
        sql = "SELECT * FROM pedidos WHERE DAYOFWEEK(fecha_pedido) = %s"
        cursor.execute(sql, (dia,))

        columnas = [col[0] for col in cursor.description]
        ventas = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]
        total_dia = sum(float(v['total']) for v in ventas)

        cursor.close()
        return jsonify({"ventas": ventas, "total": total_dia, "exito": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@pedidos_bp.route('/api/ventas/mes', methods=['GET'])
def ventas_por_mes():
    try:
        mes = request.args.get('mes', type=int)
        if mes is None or not (1 <= mes <= 12):
            return jsonify({"error": "Parámetro 'mes' inválido (1-12)"}), 400

        cursor = mysql.connection.cursor()
        sql = "SELECT * FROM pedidos WHERE MONTH(fecha_pedido) = %s"
        cursor.execute(sql, (mes,))

        columnas = [col[0] for col in cursor.description]
        ventas = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]
        total_mes = sum(float(v['total']) for v in ventas)

        cursor.close()
        return jsonify({"ventas": ventas, "total": total_mes, "exito": True}), 200
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({"error": str(e)}), 400