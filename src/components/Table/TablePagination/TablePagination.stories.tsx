import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import TablePagination from './TablePagination';

export default {
  title: 'Table Pagination',
  decorators: [withA11y],
};

export const Default = () => {
  const pagination = {
    page: 1,
    pageSize: 10,
    totalPages: 4,
    totalItems: 38,
  };
  return <TablePagination pagination={pagination} onPageChanged={action('pageChanged')} />;
};
