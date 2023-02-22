import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from "./context";
import { FaWindowClose } from 'react-icons/fa';


const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZ4mTuUvdD6l60AzmWTIZ341ALx1udRQn3zv5va8czuI5VNApMbGqiIJGSuoe1EhreQY&usqp=CAU'

const SingleMovie = () => {
    const { id } = useParams();
    const [singleMovie, setSingleMovie] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [showImage, setShowImage] = useState(false)

    const fetchSingleMovieData = async (url) => {
        try {
            setLoading(true)
            const movieData = await axios.get(url);
            setSingleMovie(movieData.data)
            setLoading(false)
        }
        catch (error) {
            setError(true)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSingleMovieData(`${API_ENDPOINT}&i=${id}`)
    }, [id])



    if (loading) {
        return <p className="error" >Loading...</p>
    }

    if (error) {
        return <p className="error">Some Problem Occur.</p>
    }



    return (

        <div>
            <img src={singleMovie.Poster === 'N/A' ? defaultImage : singleMovie.Poster} alt={singleMovie.Title} className="main-image" onClick={() =>
                setShowImage(true)} />

{
                showImage && <dialog
                    style={{ position: "absolute" }}
                    open>
                    <div className="flexbox-container">
                     <img src={singleMovie.Poster === 'N/A' ? defaultImage : singleMovie.Poster} alt={singleMovie.Title} className="dialog-image" />
                    <div className="container-1">
                        <FaWindowClose onClick={() => setShowImage(false)} className="closeButton"/>
                        <div className="container-body">
                        <h1>{singleMovie.Title}</h1>
                        </div>
                    </div>
                    </div>
                </dialog>
            }

            <h1>{singleMovie.Title}</h1>
            <p>{singleMovie.Actors}</p>
            <p>{singleMovie.Director}</p>
            <p>{singleMovie.Genre}</p>
            <p>{singleMovie.Language}</p>
            <p>{singleMovie.Plot}</p>
            <p>{singleMovie.Genre}</p>

            <p>{singleMovie.Year}</p>
            <p>{singleMovie.imdbRating} - {singleMovie.imdbVotes} Votes</p>
            <p>{singleMovie.Ratings && singleMovie.Ratings.map((rate) => {
                return (
                    <p>{rate.Source} - {rate.Value}</p>
                )
            })}</p>
        </div>



    )
}

export default SingleMovie