from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate  # <-- Add this import
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()  # <-- Create Migrate instance here (outside the app factory)

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')  # Load config from config.py

    # Initialize database, migrations, and CORS
    db.init_app(app)
    migrate.init_app(app, db)  # <-- Initialize Migrate with app and db
    CORS(app)  # Allow requests from React frontend

    # Register API routes
    from app.routes.task_routes import task_routes
    app.register_blueprint(task_routes)

    return app