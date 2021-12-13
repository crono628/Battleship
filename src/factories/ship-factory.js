function shipFactory(ship) {
  let health = Array(ship.length).fill({ hitIndex: null });
  const getLength = () => health.length;
  const showHealth = () => health;
  const getDirections = () => ship.directions;
  const hit = (index, coordinate) =>
    health.splice(index, 1, { ...health[index], hitIndex: coordinate });
  const sunk = () => health.every((spot) => spot.hitIndex !== null);
  return { getLength, hit, sunk, showHealth, getDirections };
}

export { shipFactory };
