import React, { FC } from 'react';
import './TableEmpty.scss';

interface Props {
  error?: string;
  tryAgain?: () => void;
}

const TableEmpty: FC<Props> = (props) => {
  const { error, tryAgain } = props;

  const renderMessage = () => {
    if (error) {
      return (
        <>
          <p className='no-results__message'>{error}</p>
          <button className='btn btn--primary' onClick={tryAgain}>
            Try Again
          </button>
        </>
      );
    }

    return (
      <>
        <p className='no-results__message'>We couldn't find any results matching that criteria.</p>
        <small className='no-results__sub-message'>Please try expanding your search.</small>
      </>
    );
  };

  return (
    <div className='panel table-empty'>
      <header className='panel__header'>
        <h2 className='title'>No Results</h2>
      </header>
      <div className='panel__body panel__body--empty'>
        <article className='no-results'>
          <h3 className='no-results__title'>Oops.</h3>
          {renderMessage()}
        </article>
      </div>
    </div>
  );
};

export default TableEmpty;
