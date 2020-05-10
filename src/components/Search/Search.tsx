import React, { FormEvent, FC, useContext } from 'react';
import './Search.scss';

// Icons
import { SearchIcon, FilterIcon } from '../../assets/icons';

// Context
import { RestaurantContext } from '../../context/RestaurantContext/RestaurantContext';

// Components
import Input from '../common/Input/Input';
import Filters from '../Filters/Filters';

const Search: FC = () => {
  const { state, searchTermChanged, search } = useContext(RestaurantContext);
  const { searchParams } = state;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(searchParams);
  };

  const onSearchTermChanged = (term: any) => {
    if (term.length === 0) search({ ...searchParams, term });
    searchTermChanged(term);
  };

  return (
    <form className='search' onSubmit={handleSubmit}>
      <div className='panel'>
        <header className='panel__header'>
          <SearchIcon />
          <h2 className='title'>Search</h2>
        </header>
        <div className='panel__body'>
          <div className='search-bar'>
            <Input
              className='input--with-icon'
              type='text'
              label='Search'
              name='search'
              id='search'
              placeholder='Search by name, city or genre'
              value={searchParams.term}
              onChange={onSearchTermChanged}
              icon={<SearchIcon />}
            />
            <button type='submit' className='btn btn--primary search-bar__button'>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='panel'>
        <header className='panel__header'>
          <FilterIcon />
          <h2 className='title'>Filters</h2>
        </header>
        <div className='panel__body'>
          <Filters />
        </div>
      </div>
    </form>
  );
};

export default Search;
