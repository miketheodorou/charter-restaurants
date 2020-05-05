import React, { FC } from 'react';

import './Select.scss';

interface Item {
  label: string;
  value: any;
}

interface Props {
  className?: string;
  items?: Item[];
  name: string;
  label: string;
  required?: boolean;
  children?: any;
  onSelect: (item: string) => void;
}

const Select: FC<Props> = (props) => {
  const { className, items, name, label, required, children, onSelect } = props;

  const renderItems = (items: any[]) => {
    return [
      <option key={0} value=''>
        All
      </option>,
      ...items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      )),
    ];
  };
  return (
    <div className={`select ${className}`}>
      <label htmlFor={name} className='select__label'>
        {label}
      </label>
      <select
        className='select__input'
        name={name}
        required={required || false}
        onChange={(e) => onSelect(e.target.value)}
      >
        {items ? renderItems(items) : children}
      </select>
    </div>
  );
};

export default Select;
