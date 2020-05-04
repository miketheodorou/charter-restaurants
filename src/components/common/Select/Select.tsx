import React, { FC } from 'react';

import './Select.scss';

interface Props {
  items: any[];
  name: string;
  required?: boolean;
}

const Select: FC<Props> = (props) => {
  const { items, name, required } = props;
  return (
    <select name={name} required={required || false}>
      <option value=''>All</option>
      {items.map((item) => (
        <option value={item.value}>{item.label}</option>
      ))}
    </select>
  );
};

export default Select;
