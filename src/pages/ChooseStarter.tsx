import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// three pokemon choices
// each button send post request to database to update stored "pokemon" field of user table

const ChooseStarter: React.FC = () => {
  const navigate = useNavigate();

  function sendPokemon(pokemon: string) {
    const userId = Cookies.get('userIdCookie');

    fetch('/setPokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        pokemon: pokemon,
      }),
    })
      //send back true or false
      .then(() => navigate('/Home', { state: pokemon }));
  }

  return (
    <div className='starter-container'>
      <h1>Choose Your Pokemon</h1>
      <p>
        <i>
          This cutie will evolve as you accumulate rejections. Practice makes
          you stronger!
        </i>
      </p>
      <div className='pokemon-container'>
        <div className='charmander'>
          <img
            src='src/assets/charmander.gif'
            className='pokemonIcon'
            alt='charmander'
            onClick={() => sendPokemon('charmander')}
          ></img>
        </div>
        <div className='bulbasaur'>
          <img
            src='src/assets/bulbasaur.gif'
            className='pokemonIcon'
            alt='bulbasaur'
            onClick={() => sendPokemon('bulbasaur')}
          ></img>
        </div>
        <div className='squirtle'>
          <img
            src='src/assets/squirtle.gif'
            className='pokemonIcon'
            alt='squirtle'
            onClick={() => sendPokemon('squirtle')}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ChooseStarter;
