import React, { useState, useEffect } from 'react';
import './App.scss';

// API
import { getRestaurants } from './api/restaurantApi';

// Custom Components
import Table from './components/Table/Table';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants()
      .then((res) => res.json())
      .then(setRestaurants)
      .catch(console.error);
  }, []);
  return (
    <section className='restaurants'>
      <div className='restaurants__search'></div>
      <div className='restaurants__table'>
        <Table restaurants={restaurants} />
      </div>
    </section>
  );
}

export default App;
