const height = 10;

function gameBoard() {
  const board = [];
  let horizontal = true;

  function vertical() {
    horizontal = !horizontal;
  }

  function loadBoard() {
    for (let i = 0; i < height * height; i++) {
      board.push({ hasShip: false, shipType: null, shotTaken: false, id: i });
    }
  }

  board.length === 0 ? loadBoard() : [];

  function placeShip(coordinate, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        board[coordinate + i].hasShip = true;
        board[coordinate + i].shipType = `${ship.name}`;
      } else {
        board[coordinate + i * height].hasShip = true;
        board[coordinate + i * height].shipType = `${ship.name}`;
      }
    }
  }

  function receiveAttack(coordinate) {
    board[coordinate].shotTaken = true;
  }

  function allShipsSunk() {
    let allShips = board.filter((square) => square.hasShip === true);
    if (allShips.every((ship) => ship.shotTaken === true)) {
      return true;
    }
  }

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
