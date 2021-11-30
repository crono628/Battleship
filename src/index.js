import { shipFactory } from './factories/ship.js';

console.log('click');

let thisGuy = shipFactory(5);

console.log(thisGuy.getHealth());
