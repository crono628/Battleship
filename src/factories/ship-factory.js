function shipFactory(ship) {
  const health = new Array(ship.length).fill({ hitLoc: null });
  const hit = (index, coordinate) =>
    health.splice(index, 1, { ...health[index], hitLoc: coordinate });
  const sunk = () => health.every((spot) => spot.hitLoc !== null);
  const directions = () => ship.directions;
  return { hit, sunk, directions };
}

export { shipFactory };
