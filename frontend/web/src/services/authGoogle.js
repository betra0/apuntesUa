import { API_URL } from "../config";

export default async function sendAuthGoogleCode(code){
    try {
        const response = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (response.ok) {
            return data.data 
        }else if(response.status === 401){
            return false 
        }else{
            console.error(`Error ${response.status}: Ocurrió un error en la solicitud`);
            throw new Error(' Error Desconocido');
            
        }



    } catch (error) {
        console.error('Error:', error);
    }
};