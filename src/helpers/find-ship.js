function findShip(array, ship, event) {
  let shipFilter = array.filter((obj) => ship === obj.shipType);
  let finder = shipFilter.indexOf(event);
  return finder;
}

export { findShip };
