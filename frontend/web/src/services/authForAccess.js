import { API_URL } from "../config";
import { formatUser } from "../models/user";
import { findAccessToken } from "../utils/accessTokenStorage";
import { ApiError } from "../utils/customErrors";
import newAccessTokenManager from "./newAccessToken";

export default async function authforAccess({repeat=false, signal=null, code=null}={}){
    const controller = new AbortController();
    const fetchSignal = signal || controller.signal;
    code=code || findAccessToken()
    if(!code && repeat===false){
        //llamar a una funcion que intente consegir un accesstoken nuevo y luego vuelñva allamar a esta funcion
        
        return newAccessTokenManager({func:authforAccess, fetchSignal})
    }


    try {
        const response = await fetch(`${API_URL}/auth/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${code}`,
            },
            credentials: 'include',
            signal: fetchSignal,
        });

        const json = await response.json();
        if (response.ok) {

            return formatUser(json.user)
            
        }else if(response.status === 401){
            if(!repeat){
                return newAccessTokenManager({func:authforAccess, signal})
            }
            throw new ApiError(json.message,401)
        }else{
            throw new Error(`Error ${response.status}: Ocurrió un error en la solicitud`);
        }


    } catch (error) {
        console.error('Error:', error);
        throw error
    }
};