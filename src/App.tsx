import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

import { getRestaurants } from './api/restaurantApi';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants()
      .then((res) => res.json())
      .then(setRestaurants)
      .catch(console.error);
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
