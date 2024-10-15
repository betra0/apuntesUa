import { GOOGLE_AUTH_URL, GOOGLE_CLIENT_ID, SELF_URL } from "../config";


const Login = () => {
    const handleLogin = () => {
        const clientId = GOOGLE_CLIENT_ID; 
        const redirectUri = `${SELF_URL}/callback`; 
        const scope = 'profile email openid';
        const authUrl = `${GOOGLE_AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;


        window.location.href = authUrl; // Redirige al usuario a Google para iniciar sesión
    };

    return (
        <div>
            <h1>Inicio de Sesión con Google</h1>
            <button onClick={handleLogin}>Iniciar Sesión con Google</button>
        </div>
    );
};

export default Login;