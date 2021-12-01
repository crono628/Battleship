const height = 10;

function gameBoard() {
  let board = [];
  let horizontal = true;
  const loadBoard = () => {
    for (let i = 0; i < height * height; i++) {
      board.push({ hasShip: false, shotTaken: false, id: i });
    }
  };

  board.length === 0 ? loadBoard() : [];

  const placeShip = (coordinate, ship) => {
    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        board[coordinate + i].hasShip = true;
      } else {
        board[coordinate + i * height].hasShip = true;
      }
    }
  };

  const receiveAttack = (coordinate) => {
    board[coordinate].shotTaken = true;
  };

  return { loadBoard, placeShip, horizontal, receiveAttack, board };
}

export { gameBoard };
