
import { createContext, useState, useContext, useEffect, useRef} from "react";
import { findAccessToken } from "../utils/accessTokenStorage";
import authforAccess from "../services/authForAccess";
import sessionExpiredError from "../utils/customErrors";


const userContext = createContext();


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isRunning = useRef(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null )
    const [triger, setTriger] = useState(false)


    useEffect(()=>{
        
      const fetchData = async () => {
        isRunning.current = true;
        try{
          const res = await authforAccess()
          if(res)
            setUser(res)
        }catch(e){
          if(e instanceof sessionExpiredError){
            setUser(false)
          }/* else if(e.name==='AbortError') {
            console.log('Abortando')
          } */
          else{
            console.error(e) 
            setError(e)
          }
        }finally{
          isRunning.current=false
          setLoading(false)
        }

      }
      if(!isRunning.current){
        fetchData()
      }

        
    },[triger])

    const changeUser=(user)=>{
      setUser(user)
      setLoading(false)
      setError(null)
    }
    const goToAuth=()=>{
      setUser(false)
      setLoading(false)
      setError(null)
    }
    const refreshSession=()=>{
      setUser(null)
      setLoading(true)
      setError(null)
      setTriger(!triger)

    }
  
    return (
      <userContext.Provider value={{ user, loading, error, changeUser, goToAuth, refreshSession }}>
        {children}
      </userContext.Provider>
    );
  };


export function useUserContext() {
    return useContext(userContext);
}