import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Contenido = () => {
    return (
        <>
            <NavBar></NavBar>

            <div className='p-4'>
                <Outlet />
            </div>
        </>
    )
}

export default Contenido