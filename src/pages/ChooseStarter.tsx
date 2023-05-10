import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// three pokemon choices
// each button send post request to database to update stored "starter" field of user table

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
    .then(() => navigate('/Home'));
  }

  return (
    <div className='pokemon-container'>
      <div className='charmander'>
        <img src='charmander.png'></img>
        <button id='charmanderButton' onClick={() => sendPokemon('charmander')}>
          Charmander
        </button>
      </div>
      <div className='bulbasaur'>
        <img src='bulbasaur.png'></img>
        <button id='bulbasaurButton' onClick={() => sendPokemon('bulbasaur')}>
          Bulbasaur
        </button>
      </div>
      <div className='squirtle'>
        <img src='squirtle.png'></img>
        <button id='squirtleButton' onClick={() => sendPokemon('squirtle')}>
          Squirtle
        </button>
      </div>
    </div>
  );
};

export default ChooseStarter;
