import React, { useReducer, createContext, Dispatch } from 'react';
import { Restaurant } from '../../models/Restaurant.model';

// Action Types
import { FETCH_SUCCESS, FETCH_ERROR } from './actionTypes';

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
      page: number;
    };
    restaurants: Restaurant[];
  };
  dispatch: Dispatch<Action>;
  fetchRestaurantsSuccess: (restaurants: Restaurant[]) => void;
}

export const RestaurantContext = createContext({} as RestaurantContextProps);

const initialState = {
  filters: {
    state: null,
    genre: null,
    searchTerm: '',
    page: 1,
  },
  restaurants: [],
};

const reducer = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case FETCH_SUCCESS:
      return { ...state, restaurants: payload };
    default:
      return state;
  }
};

export const RestaurantProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRestaurantsSuccess = (restaurants: Restaurant[]): void => {
    dispatch({ type: FETCH_SUCCESS, payload: restaurants });
  };

  const value = {
    state,
    dispatch,
    fetchRestaurantsSuccess,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
