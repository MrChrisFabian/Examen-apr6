import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    const volver = () => {
        navigate('/contenido/list')
    }
    return (
        <button className="text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-300 dark:text-blue-300 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900" onClick={volver}>Volver</button>
    )
}

export default Home