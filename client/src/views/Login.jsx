import React from 'react'
import UserForm from '../components/UserForm'

const Login = () => {
  return (
    <div className='flex flex-row p-10 items-center content-center justify-evenly'>
      <div>
        <UserForm formType='login' />
      </div>
      <div>
        <UserForm formType='register' />
      </div>
    </div>
  )
}

export default Login