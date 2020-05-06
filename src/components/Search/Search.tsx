import React, { useReducer, FormEvent, FC, useEffect } from 'react';
import './Search.scss';

// Icons
import { SearchIcon, FilterIcon } from '../../assets/icons';

// Models
import { Searchparams } from '../../models/SearchParams';
import { Action } from '../../models/Action.model';

// Components
import Input from '../common/Input/Input';
import Filters from '../Filters/Filters';

// Action Types
import { SEARCH_TERM_CHANGED, FILTER_CHANGED } from './actionTypes';

const initialState = {
  term: '',
  filters: {
    state: null,
    genre: null,
    attire: null,
  },
};

const reducer = (state: Searchparams = initialState, { type, payload }: Action) => {
  switch (type) {
    case SEARCH_TERM_CHANGED:
      return { ...state, term: payload };
    case FILTER_CHANGED:
      return { ...state, filters: { ...state.filters, [payload.field]: payload.value } };
    default:
      return state;
  }
};

interface Props {
  onSearch: (searchparams: Searchparams) => void;
}

const Search: FC<Props> = (props) => {
  const { onSearch } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(state);
  };

  const onSearchTermChanged = (term: any) => {
    dispatch({ type: SEARCH_TERM_CHANGED, payload: term });
  };

  const onFilterSelected = (filter: { field: string; value: string }) => {
    dispatch({ type: FILTER_CHANGED, payload: filter });
  };

  useEffect(() => {
    onSearch(state);
  }, [state.filters]);

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
              value={state.term}
              onChange={onSearchTermChanged}
              icon={<SearchIcon />}
            />
            <button type='submit' className='search-bar__button'>
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
          <Filters onSelect={onFilterSelected} />
        </div>
      </div>
    </form>
  );
};

export default Search;
