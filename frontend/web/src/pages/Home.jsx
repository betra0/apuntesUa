import { useUserContext } from "../context/userContext";


export default function HomePage(){
  const { user, loading, error, changeUser, goToAuth, refreshSession } = useUserContext();
    const handleExit = (e) => {
        goToAuth()
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <h1 className="">Pagina de Inicio</h1>
            <div className="flex flex-col items-center gap-1">
                <h4>Bienvenido {user.fullName}</h4>

                <span>Correo: {user.email}</span>
                <img src={user.profilePicture} alt="Logo Usuario"  class=" bg-blue-500 rounded-full"/>
            </div>
            <button onClick={handleExit} >Cerrar sesíon</button>

        </div>
    );
};

