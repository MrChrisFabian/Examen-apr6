import React from 'react'
import axios from 'axios'

const DeleteButton = ({ element, onDeleteHandler }) => {

    const deleteElement = (id) => {
        axios.delete(`http://localhost:8000/api/movie/${id}`, { withCredentials: true })
            .then((e) => {
                console.log('Se elimino correctamente')
                onDeleteHandler(e)
            })
            .catch((err) => console.log(err))
    }
    return (
        <button onClick={() => deleteElement(element._id)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Delete</button>
    )
}

export default DeleteButton