let edges = [
  9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90,
];

const gameboardFactory = () => {
  const board = [];
  let publicBoard;
  const fleet = [];
  (function createBoard() {
    if (board.length < 100) {
      for (let i = 0; i < 100; i++) {
        board.push({ hasShip: false, shotTaken: false, id: i });
      }
    }
    publicBoard = board.slice();
  })();

  const receiveAttack = (loc) => {
    if (board[loc].shotTaken) {
      return;
    } else {
      board[loc].shotTaken = true;
    }
  };

  let legalEdges = true;

  const checkEdge = (ship, loc) => {
    let section = board.slice(loc, loc + ship.length);
    let counter = 0;
    for (let i = 0; i < ship.length; i++) {
      if (edges.includes(section[i].id)) {
        counter++;
      }
    }
    if (counter > 1) {
      return (legalEdges = false);
    } else {
      return (legalEdges = true);
    }
  };

  const placeShip = (ship, loc) => {
    checkEdge(ship, loc);
    if (legalEdges && loc + ship.length <= 99) {
      let section = board.slice(loc, loc + ship.length);
      let checkOpenSpaces = section.every((spot) => spot.hasShip === false);
      if (checkOpenSpaces) {
        section.forEach((spot) => (board[spot.id].hasShip = true));
      } else return;
    } else return;
  };

  return { publicBoard, receiveAttack, checkEdge, placeShip };
};

export default gameboardFactory;
