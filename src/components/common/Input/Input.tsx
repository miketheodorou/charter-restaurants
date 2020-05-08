import React, { FC } from 'react';
import './Input.scss';

interface Props {
  className?: string;
  type: string;
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  icon?: any;
  value: any;
  onChange: (val: string | number) => void;
}

const Input: FC<Props> = (props) => {
  const {
    className = '',
    type,
    label,
    name,
    id,
    placeholder,
    required,
    icon = null,
    value,
    onChange,
  } = props;
  return (
    <div className={`input ${className}`}>
      <label className='input__label' htmlFor={name}>
        {label}
      </label>
      <input
        className='input__field'
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {icon}
    </div>
  );
};

export default Input;
