import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import './App.css'

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZ4mTuUvdD6l60AzmWTIZ341ALx1udRQn3zv5va8czuI5VNApMbGqiIJGSuoe1EhreQY&usqp=CAU'

const Movie = () => {
    const { data, filteredData, isLoading } = useGlobalContext();

    if(isLoading){
        return <h1 className="error">Loading...</h1>
    }
  return (
    <div className="container">
       {filteredData && filteredData.map((item) => {
        const { imdbID: id, Poster: poster, Title: title, Year: year } = item;
        return (
            <div className="item">
                
            <Link to={`/movies/${id}`} key={id} className='movie'>
                <img className="card-image" src={poster === 'N/A' ? defaultImage : poster } alt={title} />
                <p className="heading">{title}</p>
                <p className="year">Year - {year}</p>
            </Link>
            </div>
        )
       })}
    </div>
  )
}

export default Movie;