import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import Input from './Input';
import { SearchIcon } from '../Icons';

export default {
  title: 'Input',
  component: Input,
  decorators: [withA11y],
  excludeStories: /.*Props$/,
};

export const baseProps = {
  className: 'example-select',
  type: 'text',
  name: 'Test',
  label: 'Test',
  id: 'Test',
  placeholder: 'Enter some text',
};

export const actionProps = {
  onChange: action('onChange'),
};

export const Default = () => {
  return (
    <div style={{ maxWidth: '200px' }}>
      <Input {...baseProps} {...actionProps} />
    </div>
  );
};

export const WithIcon = () => {
  return (
    <div style={{ maxWidth: '200px' }}>
      <Input {...baseProps} {...actionProps} className='input--with-icon' icon={<SearchIcon />} />
    </div>
  );
};
