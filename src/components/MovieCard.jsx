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

    // variabile che contiene  il path delle copertine dei film/serie
    const imagePath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`

    // recupero il codice della bandiera corrispondente alla lingua del film/serie
    const countryFlag = languageFlags[movie.original_language];

    return (
        <div>
            <img src={imagePath} alt="" />
            <h3>{movie.title || movie.name}</h3>
            <p><strong>Titolo originale:</strong> {movie.original_title || movie.original_name}</p>
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
            <p><strong>Voto:</strong> {movie.vote_average}</p>
        </div>
    );
};

export default MovieCard;
