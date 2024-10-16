import { useState } from 'react'
import { Routes, Route, Outlet, useNavigate, Navigate  } from 'react-router-dom';
import Login from './pages/Login';
import Callback from './pages/Callback';
import { useUserContext } from './context/userContext';



function App() {
  const { user, loading, error, changeUser, goToAuth, refreshSession } = useUserContext();

  return (
    <> 
        <Routes>
              <Route path="/" element={
                loading ? <h3>Cargando...</h3> 
                  : error ? <h3>Ocurrio un error</h3>
                    :user ? <h3>Pagina de inicio</h3>:
                <Login />
              } />
              <Route path="/callback" element={<Callback/>} />


              <Route path="*" element={<h2 className='flex justify-center items-center h-full'> Ruta no encontrada </h2>} />  
        </Routes>
      
    </>
  )
}

export default App
