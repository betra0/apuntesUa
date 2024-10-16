
import React, { useEffect, useRef } from 'react';
import sendAuthGoogleCode from '../services/authGoogle';
import { useNavigate } from 'react-router-dom';
import { saveAccessToken } from '../utils/accessTokenStorage';
import { useUserContext } from '../context/userContext';


function Callback(){
  const { user, loading, error, changeUser, goToAuth, refreshSession } = useUserContext();

    const handlerAuth = async(code)=>{
        try{
            const res =  await sendAuthGoogleCode(code)

            if(res){
                console.log(res)
                saveAccessToken(res.access_token)
                changeUser(res.user)
                navigate('/')
            }
        }catch(e){
            console.error(e)
            refreshSession()
            navigate('/')

        }
        
    }
    const isPlay = useRef(false)
    const navigate= useNavigate()
    useEffect(() => {
        // Capturar el código de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code'); // Obtienes el código de la URL
        console.log('este es el codigo', code)

        if (code && isPlay.current===false) {
            // Enviar el código a tu API
            isPlay.current=true
            handlerAuth(code)
        }
        else if(!code && isPlay.current===false){
            refreshSession()
            navigate('/')
        }
    }, []);

    return <div>Procesando...</div>; // Mensaje mientras se procesa el código
};

export default Callback;