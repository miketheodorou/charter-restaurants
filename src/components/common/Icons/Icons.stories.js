import React from 'react';
import {
  CaretIcon,
  CheckIcon,
  FilterIcon,
  HoursIcon,
  MarkerIcon,
  MonitorIcon,
  SearchIcon,
  TagsIcon,
} from './index';

import './CaretIcon/CaretIcon.scss';
import '../../../styles/index.scss';

export default {
  title: 'Common/Icons',
};

export const Carets = () => (
  <>
    <CaretIcon direction='up' />
    <CaretIcon direction='down' />
    <CaretIcon direction='left' />
    <CaretIcon direction='right' />
  </>
);
export const Check = () => <CheckIcon />;
export const Filter = () => <FilterIcon />;
export const Hours = () => <HoursIcon />;
export const Marker = () => <MarkerIcon />;
export const Monitor = () => <MonitorIcon />;
export const Search = () => <SearchIcon />;
export const Tags = () => <TagsIcon />;
