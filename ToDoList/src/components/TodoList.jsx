import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Cargar tareas desde la API al inicio
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/api/task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    }
    fetchTasks();
  }, []);

  // Agregar una nueva tarea
  async function addTask() {
    if (text.trim() === '') {
      alert('Ingrese un texto válido para la tarea.');
      return;
    }

    try {
      const newTask = { text, completed: false };
      await axios.post('http://localhost:3000/api/task', newTask);
      setTasks([...tasks, newTask]);
      setText('');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  }

  // Marcar una tarea como completada
  async function toggleCompleted(id) {
    try {
      await axios.put(`http://localhost:3000/api/task/${id}`, { completed: true });
      setTasks(tasks.map(task => (task.id === id ? { ...task, completed: true } : task)));
    } catch (error) {
      console.error('Error al marcar la tarea como completada:', error);
    }
  }

  // Eliminar una tarea
  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:3000/api/task/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  return (
    <div className="todo-list">
      <form>
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Ingresa una tarea..." />
        <button onClick={addTask}>Agregar</button>
      </form>

      {/* Renderiza la lista de tareas */}
      {tasks.map(task => (
        <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task.id)} />
          <span>{task.text}</span>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;