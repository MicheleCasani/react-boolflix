import React from 'react'
import Header from '../components/Header'
import { useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'


const MainPages = () => {

    // useState per la ricerca
    const [search, setSearch] = useState('');

    // useState per il risultato della ricerca
    const [results, setResults] = useState([]);

    // funzione per la ricerca dei film tramite chiamataa axios
    const searchMovies = async () => {
        try {
            // chiamata per la ricerca dei film
            const movieResponse = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=7ab5d6135ce0dc792ccf3d67dbe0c8f8&query=${search}`
            );

            // Chiamata per la ricerca delle serie tv
            const tvResponse = await axios.get(
                `https://api.themoviedb.org/3/search/tv?api_key=7ab5d6135ce0dc792ccf3d67dbe0c8f8&query=${search}`
            );
            setResults([...tvResponse.data.results, ...movieResponse.data.results]);
        } catch (error) {
            console.error('Errore nella richiesta API:', error);
        }
    };

    const show = () => {
        if (results.length > 0) {
            return (
                <>
                    {results.map((movie) => (
                        <div
                            className="col-6 col-sm-4 col-md-3 col-lg-3 d-flex justify-content-center"
                            key={movie.id}
                        >
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </>
            );
        }
        else {
            return (
                <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '80vh' }}>
                    <h1 className='main-logo text-danger'>BOOLFLIX</h1>
                    <div className='text-white'>Un mondo di Film e Serie in esclusiva!</div>
                </div>
            );
        }


    }


    return (
        <>
            <div className='row fixed'>
                <div className='col-12 p-5 bg-dark'>
                    <Header
                        query={search}
                        setQuery={setSearch}
                        searchMovies={searchMovies}
                    />
                </div>
            </div>
            <div className='container my-3'>
                <div className='row'>
                    {show()}
                </div>
            </div>
        </>
    )
}

export default MainPages


