import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    return currentUser ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoute