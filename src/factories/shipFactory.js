function shipFactory(length, position) {
  const health = Array(length).fill(null);
  const publicHealth = health.slice();
  const sunk = () => health.every((hit) => hit !== null);
  const hit = (loc) => {
    let index = position.indexOf(loc);
    health[index] = 'x';
    publicHealth[index] = 'x';
  };
  return { sunk, hit, publicHealth };
}

export default shipFactory;
