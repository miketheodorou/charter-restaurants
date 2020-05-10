import React, { FC } from 'react';

import './TableDetail.scss';
// Models
import { Restaurant } from '../../../models/Restaurant.model';

interface Props {
  restaurant: Restaurant;
}

interface Address {
  address: string;
  city: string;
  state: string;
  zip: string;
}

const TableDetail: FC<Props> = ({ restaurant }: Props) => {
  const { address1: address, city, state, zip, tags, website, hours } = restaurant;

  const constructAddress = ({ address, city, state, zip }: Address) => {
    return `${address}, ${city}, ${state} ${zip}`;
  };

  return (
    <td className='detail-view' colSpan={5}>
      <div className='tags'>
        <h3 className='tags__title'>Tags:</h3>
        <p className='tags__text'>{tags.replace(/,/gi, ', ')}</p>
      </div>
      <div className='address'>
        <h3 className='address__title'>Address</h3>
        <p className='address__text'>{constructAddress({ address, city, state, zip })}</p>
      </div>
    </td>
  );
};

export default TableDetail;
