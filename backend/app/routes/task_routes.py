from flask import Blueprint, request, jsonify
from app.models.task import Task
from app import db

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{'id': t.id, 'title': t.title, 'completed': t.completed} for t in tasks])

# (Add POST, PUT, DELETE routes here later)