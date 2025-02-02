import { useState } from 'react';
import axios from 'axios';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { Task, TodoItemProps } from '../types';

export default function TodoItem({ task, onUpdate, onDelete }: TodoItemProps) {
  const [isUpdating, setUpdating] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const toggleCompleted = async () => {
    setUpdating(true);
    try {
      const updatedTask: Task = { ...task, completed: !task.completed };
      const { data } = await axios.put<Task>(
        `http://localhost:5000/tasks/${task.id}`,
        updatedTask
      );
      onUpdate(data);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/tasks/${task.id}`);
      onDelete(task.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`item ${task.completed ? 'completed' : ''}`}>
      <button
        onClick={toggleCompleted}
        disabled={isUpdating}
        className="status-button"
      >
        {task.completed ? <FiCheckCircle /> : <span className="circle" />}
      </button>

      <span className="title">{task.title}</span>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="delete-button"
      >
        {isDeleting ? 'Deleting...' : <FiTrash2 />}
      </button>
    </div>
  );
}