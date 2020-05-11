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
  title: 'Icons',
};

export const Caret = () => <CaretIcon direction='down' />;
export const Check = () => <CheckIcon />;
export const Filter = () => <FilterIcon />;
export const Hours = () => <HoursIcon />;
export const Marker = () => <MarkerIcon />;
export const Monitor = () => <MonitorIcon />;
export const Search = () => <SearchIcon />;
export const Tags = () => <TagsIcon />;
