function shipFactory(ship) {
  const getName = () => ship.name;
  const name = getName();
  const healthArray = Array(ship.length).fill({ hitIndex: null });
  const getHealth = () => healthArray;
  const hit = (index, coordinate) =>
    healthArray.splice(index, 1, { hitIndex: parseInt(`${coordinate}`) });
  const sunk = () => {
    return healthArray.every((space) => space.hitIndex !== null);
  };
  return { hit, sunk, getHealth, name };
}

export { shipFactory };
