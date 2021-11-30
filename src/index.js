import { shipFactory } from './factories/ship.js';

let thisGuy = shipFactory(5);
thisGuy.hit(2);
thisGuy.hit(1);
console.log(thisGuy.sunk());
console.log(thisGuy.health);
