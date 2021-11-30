function shipFactory(length) {
  let health = Array(length);
  const hit = (where) => health.splice(where, 1, 'x');
  const sunk = () => {};
  return { hit, health, sunk };
}

export { shipFactory };
