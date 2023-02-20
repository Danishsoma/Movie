import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZ4mTuUvdD6l60AzmWTIZ341ALx1udRQn3zv5va8czuI5VNApMbGqiIJGSuoe1EhreQY&usqp=CAU'

const Movie = () => {
    const { data, isLoading } = useGlobalContext();

    if(isLoading){
        return <h1>Loading...</h1>
    }
   console.log(data)
  return (
    <div className="container">
       {data && data.map((item) => {
        const { imdbID: id, Poster: poster, Title: title, Year: year } = item;

        return (
            <Link to={`/movies/${id}`} key={id} className='movie'>
                <h1>{title}</h1>
                <h4>{year}</h4>
                <img src={poster === 'N/A' ? defaultImage : poster } alt={title} />
            </Link>

        )
       })}
    </div>
  )
}

export default Movie;