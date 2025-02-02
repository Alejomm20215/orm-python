import { useState } from 'react';
import axios from 'axios';
import { Task, AddTodoFormProps } from '../types';

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { data } = await axios.post<Task>('http://localhost:5000/tasks', {
        title: title.trim(),
        completed: false
      });
      onAdd(data);
      setTitle('');
    } catch (err) {
      console.error('Add task failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="input"
      />
      <button type="submit" className="button">
        ADD
      </button>
    </form>
  );
}