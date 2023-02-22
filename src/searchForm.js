import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {

  const { query, setQuery, isError } = useGlobalContext()
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={query.searchTxt}
          placeholder="Enter the Movie Name"
          onChange={(e) => setQuery({...query,searchTxt: e.target.value})} className="searchField" />
        <select onChange={(e) => setQuery({...query,year: e.target.value})}>
          <option value="">select year</option>
          <option value="2010">2010</option>
          <option value="2019">2019</option>
        </select>
      </form>
      <div>{isError && <p className="error">No Movie Found.</p>}</div>
    </>

  )
}

export default SearchForm