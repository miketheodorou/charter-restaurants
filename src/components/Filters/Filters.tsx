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
  filters: {
    [key: string]: any;
  };
  onSelect: (filter: Filter) => void;
}

const Filters: FC<Props> = (props) => {
  const { filters, onSelect } = props;

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
        onSelect={(value) => onSelect({ field: 'state', value })}
      />
      <Select
        className='filters__filter genre'
        items={genres}
        name='genre'
        label='Genre'
        value={filters.genre}
        onSelect={(value) => onSelect({ field: 'genre', value })}
      />

      <Select
        className='filters__filter attire'
        items={attire}
        name='attire'
        label='Attire'
        value={filters.attire}
        onSelect={(value) => onSelect({ field: 'attire', value })}
      />
    </div>
  );
};

export default Filters;
