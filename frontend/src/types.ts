export interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export type AddTodoFormProps = {
    onAdd: (task: Task) => void;
  };
  
  export type TodoItemProps = {
    task: Task;
    onUpdate: (task: Task) => void;
    onDelete: (id: number) => void;
  };