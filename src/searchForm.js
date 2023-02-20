import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  
  const {query,setQuery,isError} = useGlobalContext()
  return (
    <form onSubmit ={(e) => e.preventDefault()}>
    <input type="text" value={query} 
    placeholder="Enter the Movie Name" 
    onChange={(e) => setQuery(e.target.value)}/>
    
    {isError && <p>No Movie Found.</p>}
    </form>
      )
}

export default SearchForm