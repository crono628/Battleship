const height = 10;

function gameBoard() {
  let board = [];
  let horizontal = true;

  const vertical = () => {
    horizontal = !horizontal;
  };

  const loadBoard = () => {
    for (let i = 0; i < height * height; i++) {
      board.push({ hasShip: false, shipType: null, shotTaken: false, id: i });
    }
  };

  board.length === 0 ? loadBoard() : [];

  const placeShip = (coordinate, ship) => {
    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        board[coordinate + i].hasShip = true;
        board[coordinate + i].shipType = `${ship.name}`;
      } else {
        board[coordinate + i * height].hasShip = true;
        board[coordinate + i * height].shipType = `${ship.name}`;
      }
    }
  };

  const receiveAttack = (coordinate) => {
    board[coordinate].shotTaken = true;
  };

  const allShipsSunk = () => {
    let allShips = board.filter((square) => square.hasShip === true);
    if (allShips.every((ship) => ship.shotTaken === true)) {
      return true;
    }
  };

  return {
    loadBoard,
    placeShip,
    vertical,
    receiveAttack,
    board,
    allShipsSunk,
  };
}

export { gameBoard };
