import React, { FC, useContext } from 'react';
import './Filters.scss';
import { states, genres, attire } from './options';

// Components
import Select from '../common/Select/Select';
import { RestaurantContext } from '../../context/RestaurantContext/RestaurantContext';

interface Filter {
  field: string;
  value: any;
}

const Filters: FC = () => {
  const { state, search } = useContext(RestaurantContext);
  const { searchParams } = state;
  const { filters } = searchParams;

  // makes search with new filter applied -- reducer in context handles the value update for component
  const onFilterSelected = (filter: Filter) => {
    const updatedFilters = { ...filters, [filter.field]: filter.value };
    search({ ...searchParams, filters: updatedFilters });
  };

  return (
    <div className='filters'>
      <Select
        className='filters__filter state'
        items={states}
        name='state'
        label='State'
        optionLabel='abbreviation'
        optionValue='abbreviation'
        value={filters.state}
        onSelect={(value) => onFilterSelected({ field: 'state', value })}
      />
      <Select
        className='filters__filter genre'
        items={genres}
        name='genre'
        label='Genre'
        value={filters.genre}
        onSelect={(value) => onFilterSelected({ field: 'genre', value })}
      />

      <Select
        className='filters__filter attire'
        items={attire}
        name='attire'
        label='Attire'
        value={filters.attire}
        onSelect={(value) => onFilterSelected({ field: 'attire', value })}
      />
    </div>
  );
};

export default Filters;
