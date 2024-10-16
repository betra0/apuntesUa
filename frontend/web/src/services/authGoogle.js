import { API_URL } from "../config";
import { formatUser } from "../models/user";


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

        const json = await response.json();
        if (response.ok && json.data.user && json.data.access_token) {

            return {user: formatUser(json.data.user), access_token:json.data.access_token}
        }else if(response.status === 401){
            return false 
        }else{
            console.log(json)
            console.error(`Error ${response.status}: Ocurrió un error en la solicitud`);
            throw new Error(' Error Desconocido');
        }



    } catch (error) {
        console.error('Error:', error);
    }
};