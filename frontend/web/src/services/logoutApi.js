import { API_URL } from "../config";


export default async function logoutApi({}={}){


    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok ) {
            
            return true
            
        }else{
            throw new Error(`Error ${response.status}: Ocurrió un error en la solicitud`);
        }


    } catch (error) {
        console.error('Error:', error);
        throw error
    }
};