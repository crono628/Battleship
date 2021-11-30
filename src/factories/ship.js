function shipFactory(length) {
  let health = length;
  const getHealth = () => health;
  return { getHealth };
}

export { shipFactory };
