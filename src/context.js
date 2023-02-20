import React , {useState,useContext,useEffect, Children } from "react";
import axios from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=8d837906`;


const AppContext = React.createContext()

const AppProvider = ({children}) => {
  
   const [isLoading,setIsLoading] = useState(false);
   const [isError,setIsError] = useState(false);
   const [data,setData] = useState([]);
   const [query,setQuery] = useState("all");
  
   const fetchData = async (url) => {
       try{
        
        setIsLoading(true)
        const resp = await axios.get(url);
        setIsError(false)
   
        if(resp.data.Response === 'True'){
            setData(resp.data.Search)
        }
        else{
            setData([])
            setIsError(true)
        }
        setIsLoading(false)
       }

       catch(error){
        console.log(error);
       }
        
      
   }
   useEffect( () => {
    fetchData(`${API_ENDPOINT}&s=${query}`)
   },[query])


return (
    <AppContext.Provider
      value={{ isLoading, isError, data, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
}


export const useGlobalContext = () => {
    return useContext(AppContext);
  };
  
export { AppContext, AppProvider };
  