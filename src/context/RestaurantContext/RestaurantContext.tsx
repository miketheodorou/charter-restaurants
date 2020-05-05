import React, { useReducer, createContext, Dispatch } from 'react';
import { Restaurant } from '../../models/Restaurant.model';

// Action Types
import { FETCH_SUCCESS, PAGE_CHANGED, ON_SEARCH } from './actionTypes';
import { Pagination } from '../../models/Pagination.model';

interface Action {
  type: string;
  payload: any;
}

interface RestaurantContextProps {
  state: {
    filters: {
      state: string | null;
      genre: string | null;
      searchTerm: string;
      attire: string | null;
    };
    pagination: Pagination;
    restaurants: Restaurant[];
    filteredRestaurants: Restaurant[];
  };
  dispatch: Dispatch<Action>;
  fetchRestaurantsSuccess: (restaurants: Restaurant[]) => void;
  pageChanged: (page: number) => void;
  search: () => void;
}

export const RestaurantContext = createContext({} as RestaurantContextProps);

const initialState = {
  filters: {
    state: null,
    genre: null,
    name: '',
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
      return { ...state, filteredRestaurants: payload };
    default:
      return state;
  }
};

export const RestaurantProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const pageChanged = (page: number) => {
    const pagination = { ...state.pagination, page };
    dispatch({ type: PAGE_CHANGED, payload: pagination });
  };

  const search = () => {
    // remove empty keys to prevent unnecessary iterations
    const filters = { ...state.filters };
    Object.keys(state.filters).forEach(
      (key) => !filters[key] && delete filters[key]
    );

    // go through everyfilter and test them against the matching object keys
    const results = state.restaurants.filter((restaurant: any) => {
      let isMatch = false;
      Object.keys(filters).forEach((key: any) => {
        const regex = RegExp(`${filters[key]}`, 'gi');
        isMatch = regex.test(restaurant[key]);
      });
      return isMatch;
    });

    dispatch({ type: ON_SEARCH, payload: results });
  };

  const value = {
    state,
    dispatch,
    fetchRestaurantsSuccess,
    pageChanged,
    search,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
