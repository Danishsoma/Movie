import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {

  const { query, setQuery, isError } = useGlobalContext()
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={query.searchTxt}
          placeholder="Enter the Movie Name"
          onChange={(e) => setQuery({...query,searchTxt: e.target.value,year:'select Year'})} className="searchField" />
        <select value={query.year} onChange={(e) => setQuery({...query,year: e.target.value})}>
          <option value="select Year">select year</option>
          <option value="1900-1950">1900 - 1950</option>
          <option value="1950-2000">1950 - 2000</option>
          <option value="2000-2010">2000 - 2010</option>
          <option value="2010-2020">2010 - 2020</option>
          <option value="2020-2030">2020 - 2030</option>
        </select>
      </form>
      <div>{isError && <p className="error">No Movie Found.</p>}</div>
    </>

  )
}

export default SearchForm