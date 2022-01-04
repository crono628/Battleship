function autoShip(player) {
  let openSpaces = [];
  for (let i = 0; i < player.board.length; i++) {
    let spot = player.board[i];
    for (let j = 0; j < spot.length; j++) {
      if (spot[j].hasShip == false) {
        openSpaces.push(spot[j]);
      }
    }
  }
  let randomOne = Number(Math.floor(Math.random() * openSpaces.length));
  let randomTwo = Number(Math.floor(Math.random() * openSpaces.length));

  for (let ship in player.shipsClone) {
    player.placeShip(
      openSpaces[randomTwo].row,
      openSpaces[randomOne].column,
      ship
    );
  }
}

export { autoShip };
