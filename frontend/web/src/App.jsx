import { useState } from 'react'
import { Routes, Route, Outlet, useNavigate, Navigate  } from 'react-router-dom';
import Login from './pages/Login';
import Callback from './pages/Callback';



function App() {


  return (
    <>
    <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/callback" element={<Callback/>} />


            <Route path="*" element={<h2 className='flex justify-center items-center h-full'> Ruta no encontrada </h2>} />  
      </Routes>
      
    </>
  )
}

export default App
