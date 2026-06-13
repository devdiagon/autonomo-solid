import { Toucan, Hummingbird, Ostrich, Penguin } from './bird-catalog';

const toucan      = new Toucan();
const hummingbird = new Hummingbird();
const ostrich     = new Ostrich();
const penguin     = new Penguin();

toucan.eat();
toucan.fly();

hummingbird.eat();
hummingbird.fly();

ostrich.eat();
ostrich.swim();

penguin.eat();
penguin.swim();
