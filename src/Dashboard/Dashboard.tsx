import React, { useEffect, useContext, FormEvent } from 'react';
import './Dashboard.scss';

// Icons
import { SearchIcon } from '../assets/icons';

// API
import { getRestaurants } from '../api/restaurantApi';

// Context
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

// Components
import Filters from '../components/Filters/Filters';
import Table from '../components/Table/Table';
import Input from '../components/common/Input/Input';

const Dashboard = () => {
  const { fetchRestaurantsSuccess, search } = useContext(RestaurantContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search();
  };

  useEffect(() => {
    getRestaurants().then(fetchRestaurantsSuccess).catch(console.error);
  }, []);

  return (
    <section className='restaurants'>
      <form className='restaurants__search' onSubmit={handleSubmit}>
        <div className='search'>
          <Input
            className='input--with-icon'
            type='text'
            label='Search'
            name='search'
            id='search'
            placeholder='Search by name, city or genre'
            onChange={(val) => console.log(val)}
            icon={<SearchIcon />}
          />
          <button onClick={search} className='search__button'>
            Search
          </button>
        </div>
        <Filters />
      </form>
      <div className='restaurants__results'>
        <Table />
      </div>
    </section>
  );
};

export default Dashboard;
