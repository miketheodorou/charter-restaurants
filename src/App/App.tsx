import React from 'react';

// Context
import { RestaurantProvider } from '../context/RestaurantContext/RestaurantContext';

// Custom Components
import Dashboard from '../components/Dashboard/Dashboard';

function App() {
  return (
    <RestaurantProvider>
      <Dashboard />
    </RestaurantProvider>
  );
}

export default App;
