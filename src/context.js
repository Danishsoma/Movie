import React, { useState, useContext, useEffect, Children } from "react";
import axios from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=8d837906`;


const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({ searchTxt: "China" });
  const [filteredData, setFilteredData] = useState([]);


  const fetchData = async (url) => {
    try {
      setIsError(false)
      setIsLoading(true)
      const resp = await axios.get(url);
      setIsError(false)
      if (resp.data.Response === 'True') {
        let sortedData = sortedDataFunction(resp.data.Search);
        setData(sortedData)
        setFilteredData(fitlterData(sortedData))
      }
      else {
        setData([])
        setFilteredData([])
        setIsError(true)
      }
      setIsLoading(false)
    }

    catch (error) {
      console.log(error);
    }
  }

  function sortedDataFunction(data){
    const sortedData =data.sort((a, b) => {
      return parseInt(a.Year) - parseInt( b.Year);
    });

    return sortedData;
  }



  function fitlterData(data) {

    const filteredData = data.filter((movie) => {
      if(!query.year){
        return data;
      }

      if(query.year === 'select Year'){
        return data;
      }
      let value = query.year.split("-")
      let min = value[0];
      let max = value[1];
      if ((query.searchTxt ? movie.Title.indexOf(query.searchTxt) != -1 : true) && (value ? (movie.Year > min && movie.Year <= max) : true)) {
        return true
      }

      return false;
    });

    const sortedData =sortedDataFunction(filteredData);

    return sortedData;

  }

  useEffect(() => {
    if(data){
      let filteredData = fitlterData(data);
      console.log("filteredData",filteredData)
      if (filteredData.length == 0) {
        setIsError(true)
        setFilteredData([])
      } else {
        setIsError(false)
        setFilteredData(filteredData);
      }

    }

  }, [query])

  useEffect(() => {
    fetchData(`${API_ENDPOINT}&s=${query.searchTxt}`)
  }, [query.searchTxt])



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
