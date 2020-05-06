import React, { FC } from 'react';
import './Filters.scss';
import { states, genres, attire } from './options';

// Components
import Select from '../common/Select/Select';

interface State {
  name: string;
  abbreviation: string;
}

interface Filter {
  field: string;
  value: any;
}

interface Props {
  onSelect: (filter: Filter) => void;
}

const Filters: FC<Props> = (props) => {
  const { onSelect } = props;

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
        onSelect={(value) => onSelect({ field: 'state', value })}
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
        onSelect={(value) => onSelect({ field: 'genre', value })}
      />

      <Select
        className='filters__filter'
        items={attire}
        name='attire'
        label='Attire'
        onSelect={(value) => onSelect({ field: 'attire', value })}
      />
    </div>
  );
};

export default Filters;
