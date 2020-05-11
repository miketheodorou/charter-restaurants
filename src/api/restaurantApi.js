const getRestaurants = () => {
  return new Promise((resolve, reject) => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // sorts in alphabetical order
        const sorted = res.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
        resolve(sorted);
      })
      .catch(reject);
  });
};

export { getRestaurants };
