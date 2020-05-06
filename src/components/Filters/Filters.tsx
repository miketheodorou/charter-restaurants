import React, { FC, useContext } from 'react';
import './Filters.scss';
import { states, genres } from './options';

// Context
import { RestaurantContext } from '../../context/RestaurantContext/RestaurantContext';

// Components
import Select from '../common/Select/Select';

interface State {
  name: string;
  abbreviation: string;
}

const Filters: FC = () => {
  const { filterChanged } = useContext(RestaurantContext);

  const renderStates = (states: State[]) => {
    return states.map((state) => {
      return (
        <option key={state.abbreviation} value={state.abbreviation}>
          {state.abbreviation} - {state.name}
        </option>
      );
    });
  };

  return (
    <div className='filters'>
      <Select
        className='filters__filter'
        name='state'
        label='State'
        onSelect={(value) => filterChanged('state', value)}
      >
        <>
          <option key={0} value=''>
            All
          </option>
          {renderStates(states)}
        </>
      </Select>
      <Select
        className='filters__filter'
        items={genres}
        name='genre'
        label='Genre'
        onSelect={(value) => filterChanged('genre', value)}
      />
    </div>
  );
};

export default Filters;
