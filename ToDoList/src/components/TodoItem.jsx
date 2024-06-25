import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
    </div>
  );
}

export default TodoItem;