import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Cargar tareas desde localStorage al inicio
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Agregar una nueva tarea
  function addTask() {
    if (text.trim() === '') {
      alert('Ingrese un texto válido para la tarea.');
      return;
    }
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');

    // Guardar tareas en localStorage
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  }

  // Marcar una tarea como completada
  function toggleCompleted(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    }));
  }

  // Eliminar una tarea
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    // Actualizar localStorage después de eliminar
    localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.id !== id)));
  }

  return (
    <div className="todo-list">
      <form>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ingresa una tarea..."
      />
      <button onClick={addTask}>Agregar</button>
      </form>
      {/* Renderiza la lista de tareas */}
      {tasks.map(task => (
        <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(task.id)}
          />
          <span>{task.text}</span>
          <button  onClick={() => deleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
      {/* Agrega un formulario para ingresar nuevas tareas */}
      
    </div>
  );
}

export default TodoList;