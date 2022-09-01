import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'

const PrivateRoutes = () => {
    const [cookies, setCookie] = useCookies(['access_token'])
    let auth = { 'token': false }
    if (cookies.access_token) {
        auth.token = true
    }
    return (
        auth.token ? <Outlet /> : <Navigate to="/auth" />
    )
}

export default PrivateRoutes
