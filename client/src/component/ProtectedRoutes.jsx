import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to='/login' />
    }
  return (
    <div>
      <Outlet/> 
      {/* children routes */}
    </div>
  )
}

export default ProtectedRoutes