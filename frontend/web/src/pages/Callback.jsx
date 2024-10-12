
import React, { useEffect } from 'react';

const Callback = () => {
    useEffect(() => {
        // Capturar el código de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code'); // Obtienes el código de la URL
        console.log('este es el codigo', code)

        if (code) {
            // Enviar el código a tu API
            fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Manejar los tokens devueltos
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, []);

    return <div>Procesando...</div>; // Mensaje mientras se procesa el código
};

export default Callback;