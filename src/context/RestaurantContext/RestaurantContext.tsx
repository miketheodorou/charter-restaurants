import React, { useReducer, createContext, Dispatch } from 'react';

// API
import { getRestaurants } from '../../api/restaurantApi';

// Action Types
import { FETCH_SUCCESS, ON_SEARCH, SEARCH_TERM_CHANGED, PAGE_CHANGED } from './actionTypes';

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
  fetchRestaurants: () => Promise<Restaurant[]>;
  fetchRestaurantsSuccess: (restaurants: Restaurant[]) => void;
  search: (searchParams: Searchparams) => void;
  searchTermChanged: (term: string) => void;
  pageChanged: (page: number) => void;
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
    case ON_SEARCH:
      return { ...state, ...payload };
    case SEARCH_TERM_CHANGED:
      return { ...state, searchParams: { ...state.searchParams, term: payload } };
    case PAGE_CHANGED:
      return { ...state, pagination: payload };
    default:
      return state;
  }
};

export const RestaurantProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetches initial list of restaurants
  const fetchRestaurants = () => {
    return new Promise<Restaurant[]>(async (resolve, reject) => {
      try {
        const restaurants = await getRestaurants();
        fetchRestaurantsSuccess(restaurants);
        return resolve(restaurants);
      } catch (error) {
        return reject(error);
      }
    });
  };

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

  const search = (searchParams: Searchparams) => {
    const { term, filters } = searchParams;

    // convert filters to objects with field and regex's to match against restaurant values
    const regexFilters = [...Object.keys(filters)]
      .map((key: string) => {
        // need an exact match for attire since there is overlap for the two types
        if (filters[key] && key === 'attire') {
          return { field: key, regex: RegExp('^' + filters[key] + '$', 'i') };
        }

        return filters[key] ? { field: key, regex: RegExp(filters[key], 'i') } : '';
      })
      .filter((filter) => filter);

    const filteredRestaurants = state.restaurants.filter((restaurant: Restaurant) => {
      // combines restaurant values to test with regex
      const searchFields = ['name', 'city', 'state'];
      const matchString = Object.keys(restaurant).reduce((acc: string, key: string) => {
        if (searchFields.includes(key)) acc += restaurant[key];
        return acc;
      }, '');

      // searcht term matches a name / city / state
      const termMatch = RegExp(term, 'gi').test(matchString);

      if (regexFilters.length) {
        // all filters that have been applied match their corresponding field
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

    dispatch({ type: ON_SEARCH, payload: { searchParams, filteredRestaurants, pagination } });
  };

  const searchTermChanged = (term: string) => {
    return dispatch({ type: SEARCH_TERM_CHANGED, payload: term });
  };

  // pagination for table footer
  const pageChanged = (page: number) => {
    const pagination = { ...state.pagination, page };
    dispatch({ type: PAGE_CHANGED, payload: pagination });
  };

  const value = {
    state,
    dispatch,
    fetchRestaurants,
    fetchRestaurantsSuccess,
    searchTermChanged,
    pageChanged,
    search,
  };

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};
