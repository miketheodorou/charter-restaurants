import React from 'react';
import { action } from '@storybook/addon-actions';

import TableEmpty from './TableEmpty/TableEmpty';
import TableLoader from './TableLoader/TableLoader';

export default {
  title: 'Table/States',
};

export const Empty = () => <TableEmpty />;
export const Loading = () => <TableLoader />;
export const Error = () => (
  <TableEmpty
    error="Can't fetch any results at the moment, please try again"
    tryAgain={action('click')}
  />
);
