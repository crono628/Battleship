function shipFactory(length) {
  const health = Array(length).fill(null);
  const getHealth = () => health;
  const hit = (index) => health.splice(index, 1, 'x');
  const sunk = () => {
    return health.every((space) => space === 'x');
  };
  return { hit, sunk, getHealth };
}

export { shipFactory };
