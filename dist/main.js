/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
function shipFactory(ship) {
  const getName = () => ship.name;
  const name = getName();
  const health = Array(ship.length).fill(null);
  const getHealth = () => health;
  const length = getHealth().length;
  const hit = (index) => health.splice(index, 1, 'x');
  const sunk = () => {
    return health.every((space) => space === 'x');
  };
  return { hit, sunk, getHealth, length, name };
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard)
/* harmony export */ });
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




/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
const ships = [
  {
    name: 'destroyer',
    length: 2,
  },
  {
    name: 'submarine',
    length: 3,
  },
  {
    name: 'cruiser',
    length: 3,
  },
  {
    name: 'battleship',
    length: 4,
  },
  {
    name: 'carrier',
    length: 5,
  },
];


/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerFactory": () => (/* binding */ playerFactory)
/* harmony export */ });
/* harmony import */ var _gameboard_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _ship_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _components_ships_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




let playerOneTurn = true;

function playerFactory(human) {
  if (human) {
    const playerBoard = (0,_gameboard_factory_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
    const playerShips = [];
    _components_ships_js__WEBPACK_IMPORTED_MODULE_2__.ships.forEach((ship) => {
      let newShip = (0,_ship_factory_js__WEBPACK_IMPORTED_MODULE_1__.shipFactory)(ship);
      playerShips.push(newShip);
    });

    const attack = (someone, somewhere) => {
      someone.playerBoard.receiveAttack(somewhere);
    };
    return { playerBoard, playerShips, attack };
  } else {
    // this is the cpu controller
    const playerBoard = (0,_gameboard_factory_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
    const playerShips = [];
    _components_ships_js__WEBPACK_IMPORTED_MODULE_2__.ships.forEach((ship) => {
      let newShip = (0,_ship_factory_js__WEBPACK_IMPORTED_MODULE_1__.shipFactory)(ship);
      playerShips.push(newShip);
    });

    if (playerShips.length == 5) {
      playerShips.forEach((ship) => {
        playerBoard.placeShip(random(99), iteratee('hasShip', false));
      });
    }

    const attack = (someone, somewhere) => {
      someone.playerBoard.receiveAttack(somewhere);
    };
    return { playerBoard, playerShips, attack };
  }
}




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
/* harmony import */ var _factories_ship_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _factories_gameboard_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _components_ships_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _factories_player_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);





// let thisGuy = shipFactory(3);
// thisGuy.hit(2);
// thisGuy.hit(1);

// console.log(thisGuy.sunk());

// let mikey = playerFactory();
// console.log(mikey.playerShips);

// const cpuPlayer = playerFactory();

// const boardFilter = cpuPlayer.playerBoard.board.filter(
//   (ship) => ship.hasShip === true
// );
// console.log('ships: ' + boardFilter);
// console.log(cpuPlayer.playerBoard.board);

})();

/******/ })()
;