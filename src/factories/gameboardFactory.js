const gameboardFactory = () => {
  const board = [];
  const createBoard = () => {
    for (let i = 0; i < 100; i++) {
      board.push({ hasShip: false, shotTaken: false });
    }
  };
  const receiveAttack = (loc) => {
    if (!shotTaken) {
      return;
    }
  };
};
