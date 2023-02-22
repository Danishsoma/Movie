import React , {useState,useContext,useEffect, Children } from "react";
import axios from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=8d837906`;


const AppContext = React.createContext()

const AppProvider = ({children}) => {
  
   const [isLoading,setIsLoading] = useState(false);
   const [isError,setIsError] = useState(false);
   const [data,setData] = useState([]);
   const [query,setQuery] = useState({searchTxt:"Dabangg"});
   const [filteredData, setFilteredData] = useState([])
  
   const fetchData = async (url) => {
       try{
        setIsError(false)
        setIsLoading(true)
        const resp = await axios.get(url);
        setIsError(false)
   
        if(resp.data.Response === 'True'){
            setData(resp.data.Search)
            setFilteredData(resp.data.Search)
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

   const movieFilter = (movie)=>{
      if((query.searchTxt?movie.Title.indexOf(query.searchTxt) != -1:true) && (query.year?query.year == movie.Year:true) )
      {
          return true
      }

      return false;
   }

   useEffect( () => {
    let filteredData = data.filter((movie)=>movieFilter(movie))
    setFilteredData(filteredData);
   },[query])

   useEffect(()=>{
    fetchData(`${API_ENDPOINT}&s=${query.searchTxt}`)
   },[query.searchTxt])


return (
    <AppContext.Provider
      value={{ isLoading, isError, data, filteredData, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
}


export const useGlobalContext = () => {
    return useContext(AppContext);
  };
  
export { AppContext, AppProvider };
  