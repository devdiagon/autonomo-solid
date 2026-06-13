import { VehicleManager, Tesla, Audi, Toyota, Honda, Ford, Dron } from './vehicle-manager';

const fleet = [
    new Tesla('Model S'),
    new Audi('Q5'),
    new Toyota('Prius'),
    new Honda('Civic'),
    new Ford('F-150'),
    new Dron('X7-Frederick_Tipan'),
];

console.group("03-LSP")

VehicleManager.printVehicleDetails(fleet);

console.groupEnd()