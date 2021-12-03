function shipFactory(ship) {
  const getName = () => ship.name;
  const name = getName();
  const health = Array(ship.length).fill(null);
  const getHealth = () => health;
  const length = getHealth().length;
  const hit = (index) => health.splice(index, 1, 'x');
  const sunk = () => {
    return health.every((space) => space === 'x');
  };
  return { hit, sunk, getHealth, length, name };
}

export { shipFactory };
