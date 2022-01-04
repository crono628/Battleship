const shipFactory = (ship) => {
  const health = new Array(ship.length).fill({ hitLoc: null });
  const hit = (index, yRow, xColumn) =>
    health.splice(index, 1, { ...health[index], hitLoc: [yRow, xColumn] });
  const sunk = () => health.every((spot) => spot.hitLoc !== null);
  return { hit, sunk, health };
};

export { shipFactory };
