const height = 10;

function gameBoard() {
  let board = [];
  let horizontal = true;

  const vertical = () => {
    horizontal = !horizontal;
  };

  const loadBoard = () => {
    for (let i = 0; i < height * height; i++) {
      board.push({ hasShip: false, shotTaken: false, id: i });
    }
  };

  board.length === 0 ? loadBoard() : [];

  const placeShip = (coordinate, ship) => {
    for (let i = 0; i < ship.length; i++) {
      horizontal
        ? (board[coordinate + i].hasShip = true)
        : (board[coordinate + i * height].hasShip = true);
    }
  };

  const receiveAttack = (coordinate) => {
    board[coordinate].shotTaken = true;
  };

  return {
    loadBoard,
    placeShip,
    vertical,
    receiveAttack,
    board,
  };
}

export { gameBoard };
