/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerFactory": () => (/* binding */ playerFactory),
/* harmony export */   "playerOneTurn": () => (/* binding */ playerOneTurn)
/* harmony export */ });
/* harmony import */ var _gameboard_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_ships_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



let playerOneTurn = true;
let switchTurn = () => (playerOneTurn = !playerOneTurn);

const playerFactory = (human) => {
  if (human) {
    let prototype = (0,_gameboard_factory_js__WEBPACK_IMPORTED_MODULE_0__.gameBoardFactory)();
    let shipsClone = { ..._components_ships_js__WEBPACK_IMPORTED_MODULE_1__.ships };
    const attack = (someOne, someY, someX) => {
      if (playerOneTurn) {
        someOne.receiveAttack(someY, someX);
        switchTurn();
      } else console.log('not human turn');
    };
    return Object.assign({}, prototype, { attack, shipsClone });
  } else {
    let prototype = (0,_gameboard_factory_js__WEBPACK_IMPORTED_MODULE_0__.gameBoardFactory)();
    const attack = (someOne, someY, someX) => {
      if (!playerOneTurn) {
        if ((someY, someX)) {
          someOne.receiveAttack(someY, someX);
          switchTurn();
        } else {
          let rando = Math.floor(Math.random() * 9);
          someOne.receiveAttack(rando, rando);
        }
      } else return false;
    };

    let shipsClone = { ..._components_ships_js__WEBPACK_IMPORTED_MODULE_1__.ships };
    while (prototype.fleet.length < 5) {
      for (let ship in shipsClone) {
        let rando = Math.floor(Math.random() * 9);
        prototype.randomAxis();
        if (prototype.placeShip(rando, rando, shipsClone[ship]) !== false) {
          delete shipsClone[ship];
        }
      }
    }

    return Object.assign({}, prototype, { attack, shipsClone });
  }
};




/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoardFactory": () => (/* binding */ gameBoardFactory)
/* harmony export */ });
/* harmony import */ var _factories_ship_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const gameBoardFactory = () => {
  let board = [];
  let hold = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      hold.push({
        hasShip: false,
        shotTaken: false,
        shipName: null,
        row: i,
        column: j,
      });
    }
    board.push(hold);
    hold = [];
  }

  const fleet = [];
  function findFleetShip(ship) {
    return fleet.find(({ name }) => name === ship);
  }

  function preventDouble(ship) {
    for (const boat in fleet) {
      const finder = fleet[boat];
      if (finder.name == ship.name) {
        return false;
      } else return true;
    }
    return true;
  }

  let horizontal = true;

  const toggleAxis = () => (horizontal = !horizontal);
  const randomAxis = () => {
    let randomBool = Math.random() < 0.5;
    if (randomBool) {
      horizontal = true;
    } else {
      horizontal = false;
    }
    return horizontal;
  };

  const legalMove = (xCoordinate, yCoordinate, ship) => {
    let isLegal = true;
    let possibilities = [];
    if (xCoordinate + ship.length > 10 || yCoordinate + ship.length > 10) {
      isLegal = false;
      return false;
    } else if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        possibilities.push([yCoordinate, xCoordinate + i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        possibilities.push([yCoordinate + i, xCoordinate]);
      }
    }
    if (possibilities.length == ship.length) {
      for (let i = 0; i < possibilities.length; i++) {
        let possibility = possibilities[i];
        for (let j = 0; j < possibility.length; j++) {
          if (board[possibility[0]][possibility[1]].hasShip == true) {
            isLegal = false;
          }
        }
      }
    }
    return isLegal;
  };

  const placeShip = (yRow, xColumn, boat) => {
    if (preventDouble(boat)) {
      if (legalMove(xColumn, yRow, boat)) {
        let shipArray = [];
        for (let i = 0; i < boat.length; i++) {
          if (horizontal) {
            board[yRow][xColumn + i].hasShip = true;
            board[yRow][xColumn + i].shipName = boat.name;
            shipArray.push([yRow, xColumn + i]);
          } else {
            board[yRow + i][xColumn].hasShip = true;
            board[yRow + i][xColumn].shipName = boat.name;
            shipArray.push([yRow + i, xColumn]);
          }
        }
        fleet.push({
          name: boat.name,
          location: shipArray,
          functions: (0,_factories_ship_factory_js__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(boat),
        });
      } else {
        return false;
      }
    }
  };

  const missedShots = [];

  const receiveAttack = (yRow, xColumn) => {
    const here = board[yRow][xColumn];
    here.shotTaken = true;
    if (here.hasShip) {
      let ship = findFleetShip(here.shipName);
      let { location } = ship;
      let theIndex;
      location.forEach((spot, index) => {
        if (spot[0] === yRow && spot[1] === xColumn) {
          theIndex = index;
        }
      });
      ship.functions.hit(theIndex, yRow, xColumn);
    }
    if (!here.hasShip) {
      missedShots.push([yRow, xColumn]);
    }
  };

  const allSunk = () => {
    let allShipsSunk = false;
    for (let ship of fleet) {
      if (fleet.every((obj) => obj.functions.sunk())) {
        allShipsSunk = true;
      } else allShipsSunk = false;
    }
    return allShipsSunk;
  };

  return {
    placeShip,
    fleet,
    receiveAttack,
    missedShots,
    allSunk,
    toggleAxis,
    board,
    randomAxis,
  };
};




/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
const shipFactory = (ship) => {
  const health = new Array(ship.length).fill({ hitLoc: null });
  const hit = (index, yRow, xColumn) =>
    health.splice(index, 1, { ...health[index], hitLoc: [yRow, xColumn] });
  const sunk = () => health.every((spot) => spot.hitLoc !== null);
  return { hit, sunk, health };
};




/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
const ships = {
  destroyer: {
    name: 'destroyer',
    length: 2,
  },
  submarine: {
    name: 'submarine',
    length: 3,
  },
  cruiser: {
    name: 'cruiser',
    length: 3,
  },
  battleship: {
    name: 'battleship',
    length: 4,
  },
  carrier: {
    name: 'carrier',
    length: 5,
  },
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_player_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_ships_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



const playerSection = document.querySelector('.player-section');
const cpuSection = document.querySelector('.cpu-section');

let playerOne = (0,_factories_player_factory_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)('human');
let computer = (0,_factories_player_factory_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();

if (!_factories_player_factory_js__WEBPACK_IMPORTED_MODULE_0__.playerOneTurn && !playerOne.allSunk() && computer.allSunk()) {
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

})();

/******/ })()
;