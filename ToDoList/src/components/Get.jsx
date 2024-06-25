async function getTareas() {///Este metodo obtendra las tareas guardadas en el api
    try {
        const response = await fetch("http://localhost:3000/api/task")
        let listarTareas =await response.json()
        return listarTareas

    } catch (error) {
        console.log(error)
    }

};

export default getTareas