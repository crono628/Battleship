import { playerFactory, playerOneTurn } from './factories/player-factory.js';

const playerSection = document.querySelector('.player-section');
const cpuSection = document.querySelector('.cpu-section');
const axisBtn = document.querySelector('.axis-change');
const cells = document.querySelectorAll('.cell');

let playerOne = playerFactory('human');
let computer = playerFactory();

// if (!playerOneTurn && !playerOne.allSunk() && computer.allSunk()) {
//   let rando = Math.floor(Math.random() * 9);
//   computer.attack(playerOne, rando, rando);
// }

function chooseShip() {
  if (Object.getOwnPropertyNames(playerOne.shipsClone).length >= 1) {
    for (const ship in playerOne.shipsClone) {
      const element = playerOne.shipsClone[ship];
      delete playerOne.shipsClone[ship];
      if (Object.getOwnPropertyNames(playerOne.shipsClone).length == 0) {
        axisBtn.style.display = 'none';
      }
      return element;
    }
  } else {
    return false;
  }
}

function findShip() {
  if (Object.getOwnPropertyNames(playerOne.shipsClone).length >= 1) {
    for (const ship in playerOne.shipsClone) {
      const element = playerOne.shipsClone[ship];
      return element;
    }
  } else {
    return false;
  }
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell', 'player-cell');
    cellDiv.dataset.row = `${i}`;
    cellDiv.dataset.column = `${j}`;
    playerSection.appendChild(cellDiv);
  }
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cellDiv = document.createElement('div');
    cellDiv.addEventListener('click', (e) => {
      e.target.classList.add('hit');
      if (Object.getOwnPropertyNames(playerOne.shipsClone).length == 0) {
        if (!playerOne.allSunk() || !computer.allSunk()) {
          playerOne.attack(
            computer,
            parseInt(e.target.dataset.row),
            parseInt(e.target.dataset.column)
          );
          let rando = Math.floor(Math.random() * 9);
          while (!playerOneTurn) {
            computer.attack(playerOne, rando, rando);
          }
          findPlayerShip();
        }
      }
    });
    cellDiv.classList.add('cell', 'cpu-cell');
    cellDiv.dataset.row = `${i}`;
    cellDiv.dataset.column = `${j}`;
    cpuSection.appendChild(cellDiv);
  }
}

const playerCell = document.querySelectorAll('.player-cell');
const cellRow = document.querySelectorAll('[data-row]');

function findPlayerShip() {
  let finder = playerOne.board.map((x) => {
    return x.filter((y) => y.shotTaken == true);
  });
  let otherFinder = finder.map((x) => {
    return x.filter((y) => y.hasShip == true);
  });
  finder.forEach((element) => {
    element.forEach((cell) => {
      if (cell.shotTaken) {
        document.querySelector(
          `[data-row="${cell.row}"], [data-column="${cell.column}"], .player-cell`
        ).style.backgroundColor = 'black';
      } else return false;
    });
  });
  otherFinder.forEach((element) => {
    element.forEach((cell) => {
      if (cell.hasShip) {
        document.querySelector(
          `[data-row="${cell.row}"], [data-column="${cell.column}"], .player-cell`
        ).style.backgroundColor = 'purple';
      } else return false;
    });
  });
}

playerCell.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    if (
      playerOne.placeShip(
        parseInt(e.target.dataset.row),
        parseInt(e.target.dataset.column),
        findShip()
      ) !== false
    ) {
      playerOne.placeShip(
        parseInt(e.target.dataset.row),
        parseInt(e.target.dataset.column),
        chooseShip()
      );
      findIt();
    } else {
      return false;
    }
  });
});

function findIt() {
  let finder = playerOne.board.map((x) => {
    return x.filter((y) => y.hasShip == true);
  });
  finder.forEach((item) => {
    item.forEach((x) => {
      cellRow.forEach((element) => {
        if (element.classList.contains('player-cell')) {
          if (
            element.dataset.row == x.row &&
            element.dataset.column == x.column
          ) {
            switch (x.shipName) {
              case 'destroyer':
                element.style.backgroundColor = 'hsl(0, 100%, 75%)';
                break;
              case 'submarine':
                element.style.backgroundColor = 'hsl(30, 100%, 75%)';
                break;
              case 'cruiser':
                element.style.backgroundColor = 'hsl(60, 100%, 75%)';
                break;
              case 'battleship':
                element.style.backgroundColor = 'hsl(90, 100%, 75%)';
                break;
              case 'carrier':
                element.style.backgroundColor = 'hsl(230, 100%, 75%)';
                break;
              default:
                break;
            }
          }
        }
      });
    });
  });
}

let displayToggle = true;
axisBtn.addEventListener('click', () => {
  displayToggle = !displayToggle;
  playerOne.toggleAxis();
  if (displayToggle) {
    axisBtn.textContent = 'Horizontal';
  } else {
    axisBtn.textContent = 'Vertical';
  }
});
