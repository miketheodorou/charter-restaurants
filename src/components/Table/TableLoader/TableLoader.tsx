import React, { FC } from 'react';
import './TableLoader.scss';

const TableLoader: FC = () => {
  const renderRows = (rows: number, columns: number) => {
    return [...Array(rows).keys()].map((key) => {
      return (
        <div key={key} className='table-loader__row'>
          {renderColumns(columns)}
        </div>
      );
    });
  };
  const renderColumns = (columns: number) => {
    return [...Array(columns).keys()].map((key) => <span key={key} className='line'></span>);
  };

  return (
    <section className='table-loader'>
      <div className='table-loader__header table-loader__row'>{renderColumns(6)}</div>
      <div className='table-loader__body'>{renderRows(8, 6)}</div>
    </section>
  );
};

export default TableLoader;
