import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../containers/Home'
import 'antd/dist/antd.css';

const AppRoutes = () => {
    const [loader, setLoader] = useState(true)
    
    
  return (
    <BrowserRouter>
        <Routes>
            {/* Rutas publicas */}
            <Route path='/' element={<Home loader={loader} setLoader={setLoader} />} />
            
            {/* Redireccionamiento */}
            <Route path='*' element={<Navigate to='/' /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes