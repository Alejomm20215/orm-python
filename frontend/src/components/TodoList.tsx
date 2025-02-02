import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import { Task } from '../types';

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get<Task[]>('http://localhost:5000/tasks');
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="todo-list">
      <h1>Todo App</h1>
      <AddTodoForm onAdd={(newTask) => setTasks([...tasks, newTask])} />
      
      <div className="tasks">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onUpdate={(updatedTask) =>
              setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
            }
            onDelete={(id) => setTasks(tasks.filter(t => t.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}