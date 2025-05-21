import React from 'react';

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

    // assegno ad ogni id del genere il nome del genere in italiano
    let GenreArray = {

        20: 'Azione',
        12: 'Avventura',
        16: 'Animazione',
        35: 'Commedia',
        80: 'Crime',
        99: 'Documentario',
        18: 'Drama',
        10751: 'Per tutta la famiglia',
        14: 'Fantasy',
        36: 'Storico',
        27: 'Horror',
        10402: 'Musical',
        9648: 'Mistero',
        10749: 'Romantico',
        878: 'Fiction Scientifica',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'Guerra',
        37: 'Western',
        10759: 'Azione e Avventura',
        10762: 'Per Bambini',
        10763: 'Mistero',
        10764: 'Reality',
        10765: 'Sci-Fi & Fantasy',
        10766: 'Soap Opera',
        10767: 'Talk Show',
        10768: 'Guerra e Politica',



    }

    const getGenres = () => {
        if (movie.genre_ids.length === 0) {
            return ['Genere non disponibile']
        }
        return movie.genre_ids
            .map((id) => GenreArray[id])
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



    return (
        <div className='movie-card' style={{ width: '20rem' }}>


            {setImg()}


            <div className='card-overlay'>

                <h3 className='card-title '>{movie.title || movie.name}</h3>

                <p ><strong>Titolo originale:</strong> {movie.original_title || movie.original_name}</p>

                <p ><strong>Genere:</strong> {getGenres().join(', ')}</p>

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
