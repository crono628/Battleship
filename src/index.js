import { playerFactory, playerOneTurn } from './factories/player-factory.js';
import { ships } from './components/ships.js';

const playerSection = document.querySelector('.player-section');
const cpuSection = document.querySelector('.cpu-section');

let playerOne = playerFactory('human');
let computer = playerFactory();

if (!playerOneTurn && !playerOne.allSunk() && computer.allSunk()) {
  let rando = Math.floor(Math.random() * 9);
  computer.attack(playerOne, rando, rando);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cellDiv = document.createElement('div');
    cellDiv.addEventListener('click', () => {
      console.log([cellDiv.dataset.row, cellDiv.dataset.column]);
    });
    cellDiv.classList.add('cell', 'player-cell');
    cellDiv.dataset.row = `${i}`;
    cellDiv.dataset.column = `${j}`;
    playerSection.appendChild(cellDiv);
  }
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cellDiv = document.createElement('div');
    cellDiv.addEventListener('click', () => {
      console.log([cellDiv.dataset.row, cellDiv.dataset.column]);
    });
    cellDiv.classList.add('cell', 'cpu-cell');
    cellDiv.dataset.row = `${i}`;
    cellDiv.dataset.column = `${j}`;
    cpuSection.appendChild(cellDiv);
  }
}

const cellRow = document.querySelectorAll('[data-row]');
const cellColumn = document.querySelectorAll('[data-column]');

let finder = computer.board.map((x) => {
  return x.filter((y) => y.hasShip == true);
});

finder.forEach((item) => {
  item.forEach((x) => {
    cellRow.forEach((element) => {
      if (element.classList.contains('cpu-cell')) {
        if (
          element.dataset.row == x.row &&
          element.dataset.column == x.column
        ) {
          element.style.backgroundColor = 'red';
        }
      }
    });
  });
});
