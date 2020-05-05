import React, { FC } from 'react';
import './Filters.scss';
import { states, genres } from './options';

import Select from '../common/Select/Select';

interface State {
  name: string;
  abbreviation: string;
}

const Filters: FC = () => {
  const renderStates = (states: State[]) => {
    return states.map((state) => {
      return (
        <option key={state.abbreviation} value={state.abbreviation}>
          {state.abbreviation} - {state.name}
        </option>
      );
    });
  };

  const stateSelected = (state: string) => {
    console.log(state);
  };

  const genreSelected = (genre: string) => {
    console.log(genre);
  };

  return (
    <div className='filters'>
      <Select
        className='filters__filter'
        name='state'
        label='State'
        onSelect={stateSelected}
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
        onSelect={genreSelected}
      />
    </div>
  );
};

export default Filters;
