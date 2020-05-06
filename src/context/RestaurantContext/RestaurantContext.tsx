import React, { useReducer, createContext, Dispatch } from 'react';

// Action Types
import { FETCH_SUCCESS, PAGE_CHANGED, ON_SEARCH } from './actionTypes';

// Models
import { Action } from '../../models/Action.model';
import { Restaurant } from '../../models/Restaurant.model';
import { Pagination } from '../../models/Pagination.model';
import { Searchparams } from '../../models/SearchParams';

interface RestaurantContextProps {
  state: {
    searchParams: Searchparams;
    pagination: Pagination;
    restaurants: Restaurant[];
    filteredRestaurants: Restaurant[];
  };
  dispatch: Dispatch<Action>;
  fetchRestaurantsSuccess: (restaurants: Restaurant[]) => void;
  pageChanged: (page: number) => void;
  search: (searchParams: Searchparams) => void;
}

export const RestaurantContext = createContext({} as RestaurantContextProps);

const initialState = {
  searchParams: {
    term: '',
    filters: {
      state: null,
      genre: null,
      attire: null,
    },
  },
  pagination: {
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
  restaurants: [],
  filteredRestaurants: [],
};

const reducer = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case FETCH_SUCCESS:
      return { ...state, ...payload };
    case PAGE_CHANGED:
      return { ...state, pagination: payload };
    case ON_SEARCH:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const RestaurantProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetches initial list of restaurants
  const fetchRestaurantsSuccess = (restaurants: Restaurant[]): void => {
    const filteredRestaurants = restaurants;
    const pagination = {
      page: 1,
      pageSize: 10,
      totalPages: Math.ceil(restaurants.length / 10),
      totalItems: restaurants.length,
    };
    const payload = { restaurants, filteredRestaurants, pagination };
    dispatch({ type: FETCH_SUCCESS, payload });
  };

  // pagination for table footer
  const pageChanged = (page: number) => {
    const pagination = { ...state.pagination, page };
    dispatch({ type: PAGE_CHANGED, payload: pagination });
  };

  let desiredFields = ['name', 'city', 'state'];
  const search = (searchParams: Searchparams) => {
    const { term, filters } = searchParams;
    // prevents search term for searching through genres
    if (filters['genre']) desiredFields.push('genre');
    // convert filters to objects with field and regex's to match against restaurant values
    const regexFilters = [...Object.keys(filters)]
      .map((key: string) => (filters[key] ? { field: key, regex: RegExp(filters[key], 'gi') } : ''))
      .filter((filter) => filter);

    const filteredRestaurants = state.restaurants.filter((restaurant: Restaurant) => {
      // combines restaurant values to test with regex
      const matchString = [
        ...Object.keys(restaurant).map((key: string) => {
          if (desiredFields.includes(key)) return restaurant[key];
        }),
      ].join(' ');

      const termMatch = RegExp(term, 'gi').test(matchString);
      if (regexFilters.length) {
        const filterMatch = regexFilters.every((filter: any) =>
          filter['regex'].test(restaurant[filter.field])
        );
        return termMatch && filterMatch;
      }

      return termMatch;
    });

    const pagination = {
      page: 1,
      pageSize: 10,
      totalPages: Math.ceil(filteredRestaurants.length / 10),
      totalItems: filteredRestaurants.length,
    };

    dispatch({ type: ON_SEARCH, payload: { filteredRestaurants, pagination } });
  };

  const value = {
    state,
    dispatch,
    fetchRestaurantsSuccess,
    pageChanged,
    search,
  };

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};
