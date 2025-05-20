import React from 'react'

const Header = () => {
    return (
        <>
            <header>
                <input
                    type="text"
                    placeholder='Cerca un film...'
                    value={''}
                />
                <button onClick={''}>
                    Cerca
                </button>
            </header>
        </>
    )
}

export default Header
