import React, { FC } from 'react';
import './TableDetail.scss';

// Models
import { Restaurant } from '../../../models/Restaurant.model';

// Icons
import { TagsIcon, MarkerIcon, HoursIcon, MonitorIcon } from '../../../assets/icons';

interface Props {
  restaurant: Restaurant;
  expanded: boolean;
}

interface Address {
  address: string;
  city: string;
  state: string;
  zip: string;
}

const TableDetail: FC<Props> = ({ restaurant, expanded }: Props) => {
  const { address1: address, city, state, zip, tags, website, hours } = restaurant;

  const renderAddress = ({ address, city, state, zip }: Address) => {
    return `${address}, ${city}, ${state} ${zip}`;
  };

  const renderHours = (hours: string) => {
    const parsedHours = hours.split(';');
    return parsedHours.map((line) => (
      <p key={line} className='section__text'>
        {line}
      </p>
    ));
  };

  // removes duplicate tags
  const cleanAndRenderTags = (tags: string) => {
    return [...new Set(tags.split(','))].join(', ');
  };

  return (
    <td className='detail-view' colSpan={5}>
      <div className='section website'>
        <h3 className='section__title'>
          <MonitorIcon />
          Website
        </h3>
        <a
          tabIndex={expanded ? 0 : -1}
          href={website}
          title='Link to restaurant website'
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn--tertiary'
          onClick={(e) => e.stopPropagation()}
        >
          Visit Website
        </a>
      </div>

      <div className='section tags'>
        <h3 className='section__title'>
          <TagsIcon />
          Tags
        </h3>
        <p className='section__text'>{cleanAndRenderTags(tags)}</p>
      </div>

      <div className='section address'>
        <h3 className='section__title'>
          <MarkerIcon />
          Address
        </h3>
        <p className='section__text'>{renderAddress({ address, city, state, zip })}</p>
      </div>

      <div className='section hours'>
        <h3 className='section__title'>
          <HoursIcon />
          Hours
        </h3>
        {renderHours(hours)}
      </div>
    </td>
  );
};

export default TableDetail;
