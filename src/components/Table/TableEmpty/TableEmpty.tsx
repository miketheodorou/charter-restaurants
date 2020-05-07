import React from 'react';
import './TableEmpty.scss';

const TableEmpty = () => {
  return (
    <div className='panel table-empty'>
      <header className='panel__header'>
        <h2 className='title'>No Results</h2>
      </header>
      <div className='panel__body panel__body--empty'>
        <article className='no-results'>
          <h3 className='no-results__title'>Oops.</h3>
          <p className='no-results__message'>
            We couldn't find any results matching that criteria.
          </p>
          <small className='no-results__sub-message'>Please try narrowing your search.</small>
        </article>
      </div>
    </div>
  );
};

export default TableEmpty;
