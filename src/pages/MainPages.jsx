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
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=7ab5d6135ce0dc792ccf3d67dbe0c8f8&query=${search}`
            );
            setResults(response.data.results);
        } catch (error) {
            console.error('Errore nella richiesta API:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <Header
                    query={search}
                    setQuery={setSearch}
                    searchMovies={searchMovies}
                />
                <div>
                    {results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default MainPages
