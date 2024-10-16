// Función para recuperar el token de sessionStorage
export const findAccessToken = () => {
    return sessionStorage.getItem('access') ?? false;
  };
  
  // Función para guardar el token en sessionStorage
  export const saveAccessToken = (token) => {
    if (typeof token === 'string') {
      sessionStorage.setItem('access', token);
    } else {
      console.error('El token debe ser un string');
    }
  };
  export const removeAccessToken = () => {
    sessionStorage.removeItem('access');
};
