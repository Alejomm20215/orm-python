from flask import Blueprint, request, jsonify
from app.models.task import Task
from app import db

task_routes = Blueprint('tasks', __name__)  # El nombre del blueprint es 'tasks'

# --- Obtener todas las tareas ---
@task_routes.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        "id": task.id,
        "title": task.title,
        "completed": task.completed
    } for task in tasks])

# --- Crear una nueva tarea ---
@task_routes.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    # Validación de campos obligatorios
    if not data or 'title' not in data:
        return jsonify({"error": "El campo 'title' es requerido"}), 400

    new_task = Task(
        title=data['title'],
        completed=data.get('completed', False)  # Valor por defecto: False
    )
    
    db.session.add(new_task)
    db.session.commit()
    
    return jsonify({
        "id": new_task.id,
        "title": new_task.title,
        "completed": new_task.completed
    }), 201  # Código 201: Created

# --- Actualizar una tarea ---
@task_routes.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404
    
    data = request.get_json()
    
    # Actualizar solo los campos proporcionados
    if 'title' in data:
        task.title = data['title']
    if 'completed' in data:
        task.completed = data['completed']
    
    db.session.commit()
    
    return jsonify({
        "id": task.id,
        "title": task.title,
        "completed": task.completed
    })

# --- Eliminar una tarea ---
@task_routes.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404
    
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message": "Tarea eliminada exitosamente"}), 200