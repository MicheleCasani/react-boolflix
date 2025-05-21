import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { genresList } from '../data/data';

const MovieCard = ({ movie }) => {

    //  assegno ad ogni lingua il codice della bandiera corrispondente
    const languageFlags = {
        en: 'gb',
        it: 'it',
        fr: 'fr',
        es: 'es',
        de: 'de',
        ja: 'jp',
        zh: 'cn',
        ko: 'kr',
        hi: 'in',
        ru: 'ru',
        pt: 'pt',
        nl: 'nl',
        sv: 'se',
        pl: 'pl',
    };


    const GenreMap = (genresList.map(genre => [genre.id, genre.name]));

    const getGenres = () => {
        if (movie.genre_ids.length === 0) {
            return ['Genere non disponibile']
        }
        return movie.genre_ids
            .map((id) => GenreMap[id])
    };

    // numero massimo di stelle da mostrare
    let starArray = [1, 2, 3, 4, 5];

    // recupero il voto del film/serie e lo divido per 2 per avere un voto da 1 a 5 
    // e utilizzando math.ceil per arrotondareper eccesso
    const vote = Math.ceil(movie.vote_average / 2);

    // variabile che contiene  il path delle copertine dei film/serie
    const imagePath = `https://image.tmdb.org/t/p/w342${movie.poster_path}`

    // recupero il codice della bandiera corrispondente alla lingua del film/serie
    const countryFlag = languageFlags[movie.original_language];

    let setImg = () => {
        if (movie.poster_path === null) {
            return (
                <img className='card-img-top poster-img' src="src/assets/ChatGPT_Image_21_mag_2025_10_31_15.png" style={{ img: 'fluid' }} />
            )
        }
        else {
            return (
                <img className='card-img-top poster-img' src={imagePath} alt="" />
            )
        }
    }

    const [cast, setCast] = useState([]);

    const getCast = async (id) => {
        try {
            const castMovieResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7ab5d6135ce0dc792ccf3d67dbe0c8f8`
            );

            const castSerieResponse = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}/credits?api_key=7ab5d6135ce0dc792ccf3d67dbe0c8f8`
            );

            setCast([...castMovieResponse.data.cast, ...castSerieResponse.data.cast]);

        } catch (error) {
            console.error('Errore nel recupero del cast:', error);
            setCast([]);
        }
    };

    useEffect(() => {
        getCast(movie.id);
    }, [movie.id]);


    return (
        <div className='movie-card' style={{ width: '20rem' }}>


            {setImg()}


            <div className='card-overlay'>

                <h3 className='card-title '>{movie.title || movie.name}</h3>

                <p ><strong>Titolo originale:</strong> {movie.original_title || movie.original_name}</p>

                <p ><strong>Genere:</strong> {getGenres().join(', ')}</p>

                <p><strong>Cast:</strong> {cast.slice(0, 5).map((cast) => {
                    return (
                        <span>{cast.name}{', '}</span>
                    )
                })}</p>

                <p>
                    <strong>Lingua:</strong>
                    {' '}
                    {countryFlag ? (
                        <img
                            src={`https://flagcdn.com/24x18/${countryFlag}.png`}
                            alt={movie.original_language}
                        />
                    ) : (
                        movie.original_language
                    )}
                </p>

                <p><strong >Voto:</strong> {starArray.map((number) => {
                    if (number <= vote) {
                        return <span key={number}><i className="fa-solid fa-star star-color"></i></span>;
                    } else {
                        return <span key={number}><i className="fa-regular fa-star star-color"></i></span>;
                    }
                })}
                </p>

                <p className='overview'><strong>Trama:</strong> {movie.overview}</p>

            </div>

        </div>
    );
};

export default MovieCard;
