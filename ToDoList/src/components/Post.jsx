async function darDatos(){///Este es el metodo que guardara mis tareas en el api
    try {
        let task={
            fecha:Date.now(),
            tarea:contenido.value,
            estado:false
        }
        const respuesta = await fetch("http://localhost:3000/api/task",{
           method: "POST",
           headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(task)
        })
        const Datos = await respuesta.json()
        console.log(Datos)
        console.log(`Se agrego la tarea ${task.tarea}`);
    } catch (error) {
        console.error(error);
    }
}

export default darDatos