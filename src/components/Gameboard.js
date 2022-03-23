import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import playerFactory from '../factories/playerFactory';

let playerOne = playerFactory('person');
let playerTwo = playerFactory('computer');

const Gameboard = () => {
  const [playerOneData, setPlayerOneData] = useState(playerOne.publicBoard);
  const [playerTwoData, setPlayerTwoData] = useState(playerTwo.publicBoard);

  useEffect(() => {
    handleDisplayShips();
  });

  const handleClick = (e) => {
    if (e.target.classList.contains('player-one')) {
      let copy = playerOneData.slice();
      let loc = copy[e.target.id];
      if (loc.shotTaken) {
        setPlayerOneData(copy);
      } else if (!loc.shotTaken && loc.hasShip) {
        e.target.style.backgroundColor = 'crimson';
      } else {
        e.target.style.backgroundColor = 'blue';
      }
      copy[e.target.id].shotTaken = true;
      setPlayerOneData(copy);
      // console.log(playerOneData.filter((item) => item.shotTaken));
    }
    if (e.target.classList.contains('player-two')) {
      let copy = playerTwoData.slice();
      let loc = copy[e.target.id];
      if (loc.shotTaken) {
        setPlayerOneData(copy);
      } else if (!loc.shotTaken && loc.hasShip) {
        e.target.style.backgroundColor = 'crimson';
      } else {
        e.target.style.backgroundColor = 'blue';
      }
      copy[e.target.id].shotTaken = true;
      setPlayerTwoData(copy);
    }
  };

  function handleDisplayShips() {
    for (const ship of playerTwoData) {
      if (ship.hasShip && !ship.shotTaken) {
        // console.log(ship);
        let list = document.querySelectorAll('.player-two');
        list[ship.id].style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      }
    }
  }

  playerTwo.handleComputerPlacement();

  let playerTwoBoard = playerTwo.publicBoard.map((item, index) => (
    <Cell
      className={'cell player-two'}
      id={`${item.id}`}
      key={index}
      onClick={handleClick}
    />
  ));

  let playerOneBoard = playerOne.publicBoard.map((item, index) => (
    <Cell
      className={'cell player-one'}
      id={item.id}
      key={index}
      onClick={handleClick}
    />
  ));
  return (
    <div className="gameboard">
      <div className="gameboard">{playerOneBoard}</div>
      <div className="gameboard">{playerTwoBoard}</div>
    </div>
  );
};

export default Gameboard;
