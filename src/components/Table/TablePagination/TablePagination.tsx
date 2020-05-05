import React, { useContext, FC } from 'react';
import './TablePagination.scss';
import { Pagination } from '../../../models/Pagination.model';

interface Props {
  pagination: Pagination;
  onPageChanged: (page: number) => void;
}

const TablePagination: FC<Props> = (props) => {
  const { pagination, onPageChanged } = props;
  const { page, pageSize, totalPages, totalItems } = pagination;

  const start = (page - 1) * 10 + 1;
  const end = page * pageSize > totalItems ? totalItems : page * pageSize;
  return (
    <div className='pagination'>
      <div className='pagination__counts'>
        <span className='count start'>{start}</span>
        <span className='dash'>-</span>
        <span className='count end'>{end}</span>
        <span className='of'>of</span>
        <span className='count total'>{totalItems} </span>
        <span className='results'>results</span>
      </div>
      <div className='pagination__controls'>
        <button
          disabled={page === 1}
          onClick={() => onPageChanged(1)}
          className='control'
        >
          {'<<'}
        </button>
        <button
          disabled={page === 1}
          onClick={() => onPageChanged(page - 1)}
          className='control'
        >
          {'<'}
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChanged(page + 1)}
          className='control'
        >
          {'>'}
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChanged(totalPages)}
          className='control'
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
