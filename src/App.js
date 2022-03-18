import React from 'react';
import shipFactory from './factories/shipFactory';

const App = () => {
  let newShip = shipFactory(3);
  console.log(newShip.sunk());

  return <div>toot</div>;
};

export default App;
