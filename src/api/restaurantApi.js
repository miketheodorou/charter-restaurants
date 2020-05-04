const getRestaurants = () => {
  return fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
    headers: {
      Authorization: 'Api-Key q3MNxtfep8Gt',
    },
  });
};

export { getRestaurants };
