import React, { FormEvent, FC, useState } from 'react';
import './Search.scss';

// Icons
import { SearchIcon, FilterIcon } from '../../assets/icons';

// Models
import { Searchparams } from '../../models/SearchParams';

// Components
import Input from '../common/Input/Input';
import Filters from '../Filters/Filters';

const intialFilters = {
  state: null,
  genre: null,
  attire: null,
};

interface Props {
  onSearch: (searchparams: Searchparams) => void;
}

const Search: FC<Props> = (props) => {
  const { onSearch } = props;

  const [term, setTerm] = useState<string>('');
  const [filters, setFilters] = useState<any>(intialFilters);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ term, filters });
  };

  const onSearchTermChanged = (term: any) => {
    if (term.length === 0) onSearch({ term, filters });
    setTerm(term);
  };

  const onFilterSelected = (filter: { field: string; value: string }) => {
    const updatedFilters = { ...filters, [filter.field]: filter.value };
    onSearch({ term, filters: updatedFilters });
    setFilters(updatedFilters);
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
              value={term}
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
          <Filters onSelect={onFilterSelected} filters={filters} />
        </div>
      </div>
    </form>
  );
};

export default Search;
