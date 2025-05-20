import React from 'react';

const Header = ({ query, setQuery, searchMovies }) => {
    return (
        <header>
            <input
                type="text"
                placeholder="Cerca un film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}  // aggiorna lo stato in MainPages
            />
            <button onClick={searchMovies}>
                Cerca
            </button>
        </header>
    );
};

export default Header;

