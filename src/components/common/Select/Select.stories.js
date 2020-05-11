import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import Select from './Select';

export default {
  title: 'Common/Select',
  component: Select,
  decorators: [withA11y],
  excludeStories: /.*Props$/,
};

export const baseProps = {
  className: 'example-select',
  items: [
    { label: 'Test 1', value: 'Test 1' },
    { label: 'Test 2', value: 'Test 2' },
  ],
  name: 'Test',
  label: 'Test',
};

export const actionProps = {
  onSelect: action('onSelect'),
};

export const Default = () => {
  return (
    <div>
      <p>Items:</p>
      <pre>{JSON.stringify(baseProps.items)}</pre>
      <div style={{ maxWidth: '200px' }}>
        <Select {...baseProps} {...actionProps} />
      </div>
    </div>
  );
};

const customOptionsProps = {
  ...baseProps,
  items: [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
    {
      name: 'American Samoa',
      abbreviation: 'AS',
    },
  ],
  optionLabel: 'name',
  optionValue: 'abbreviation',
};

export const CustomOptions = () => {
  return (
    <div>
      <p>Items:</p>
      <pre>{JSON.stringify(customOptionsProps.items)}</pre>
      <div style={{ maxWidth: '200px' }}>
        <Select {...customOptionsProps} {...actionProps} />
      </div>
    </div>
  );
};
