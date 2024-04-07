import axios from 'axios'

import React from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
import Home from './Home'

const NavBar = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const logOutUser = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout", { withCredentials: true });
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.log("Error: ", JSON.stringify(err.response.data.msg));
            alert('Error al cerrar sesión')

        }
    }


    return (
        <div>
            <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <h1 className='font-bold text-xl'>Moldy Tomatos 🍅</h1>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <button onClick={logOutUser} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">LogOut</button>
                        <Home />
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavBar