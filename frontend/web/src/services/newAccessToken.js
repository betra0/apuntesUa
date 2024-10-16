import { API_URL } from "../config";
import { findAccessToken, saveAccessToken } from "../utils/accessTokenStorage";
import sessionExpiredError from "../utils/customErrors";

export default async function newAccessTokenManager({func=()=>{},signal=null}){

    try {
        const response = await fetch(`${API_URL}/auth/token`, {
            method: 'GET',
            credentials: 'include',
            signal: signal,
        });

        const json = await response.json();
        if (response.ok && json.data.access_token) {
            saveAccessToken(json.data.access_token)
            return func({repeat:true, signal, code:json.data.access_token}) 
        }else if(response.status === 401){
            throw new sessionExpiredError('La sesión ha expirado.');

            
        }else{
            console.error(`Error ${response.status}: Ocurrió un error en la solicitud`);
            throw new Error('Error Desconocido');
            
        }



    } catch (error) {
        console.error('Error:', error);
        throw error
    }
};