

const Login = () => {
    const handleLogin = () => {
        const clientId = '906886970042-l37hcas7vmq788m8b8340orakvmrrlcn.apps.googleusercontent.com'; // Reemplaza con tu Client ID
        const redirectUri = 'http://localhost:5173/callback'; // Debe coincidir con tu configuración de Google
        const scope = 'profile email openid';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;


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