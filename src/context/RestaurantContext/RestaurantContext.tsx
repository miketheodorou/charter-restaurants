import React, { useReducer, createContext, Dispatch } from 'react';
import { Restaurant } from '../../models/Restaurant.model';

// Action Types
import { FETCH_SUCCESS, FETCH_ERROR, PAGE_CHANGED } from './actionTypes';
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
    };
    pagination: Pagination;
    restaurants: Restaurant[];
    filteredRestaurants: Restaurant[];
  };
  dispatch: Dispatch<Action>;
  fetchRestaurantsSuccess: (restaurants: Restaurant[]) => void;
  pageChanged: (page: number) => void;
}

export const RestaurantContext = createContext({} as RestaurantContextProps);

const initialState = {
  filters: {
    state: null,
    genre: null,
    searchTerm: '',
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

  const value = {
    state,
    dispatch,
    fetchRestaurantsSuccess,
    pageChanged,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
