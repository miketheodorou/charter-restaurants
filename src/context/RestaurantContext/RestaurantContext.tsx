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
  search: () => void;
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

  // happens when search button is clicked
  const search = () => {
    // remove empty keys to prevent unnecessary iterations
    const filters = { ...state.filters };
    console.log('filters', filters);
    Object.keys(state.filters).forEach(
      (key) => !filters[key] && delete filters[key]
    );
    const filterCount = Object.keys(filters).length;
    if (filterCount) {
      // go through everyfilter and test them against the matching object keys
      const filteredRestaurants = state.restaurants.filter(
        (restaurant: any) => {
          let matches = 0;
          Object.keys(filters).forEach((key: any) => {
            const regex = RegExp(filters[key], 'gi');
            if (regex.test(restaurant[key])) matches += 1;
          });
          return matches === filterCount;
        }
      );

      const pagination = {
        page: 1,
        pageSize: 10,
        totalPages: Math.ceil(filteredRestaurants.length / 10),
        totalItems: filteredRestaurants.length,
      };
      const payload = { filteredRestaurants, pagination };
      return dispatch({ type: ON_SEARCH, payload });
    }

    // if no fields are present, do a default search and grab the original results
    const pagination = {
      page: 1,
      pageSize: 10,
      totalPages: Math.ceil(state.restaurants.length / 10),
      totalItems: state.restaurants.length,
    };
    const payload = {
      filteredRestaurants: [...state.restaurants],
      pagination,
    };
    dispatch({ type: ON_SEARCH, payload });
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
