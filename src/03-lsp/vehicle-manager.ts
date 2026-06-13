export interface Vehicle {
    model: string;
    getDetails(): string;
}

export class Tesla implements Vehicle {
    constructor(public model: string) {}
    getDetails() { return `Tesla Model: ${this.model} — Carga eléctrica al 100%`; }
}

export class Audi implements Vehicle {
    constructor(public model: string) {}
    getDetails() { return `Audi Model: ${this.model} — Tracción Quattro activada`; }
}

export class Toyota implements Vehicle {
    constructor(public model: string) {}
    getDetails() { return `Toyota Model: ${this.model} — Motor híbrido listo`; }
}

export class Honda implements Vehicle {
    constructor(public model: string) {}
    getDetails() { return `Honda Model: ${this.model} — VTEC activado`; }
}

export class Ford implements Vehicle {
    constructor(public model: string) {}
    getDetails() { return `Ford Model: ${this.model} — Built Tough`; }
}

export class Dron implements Vehicle {
    constructor(public model: string) {}
    getDetails() { return `Dron Model: ${this.model} — Vuelo autónomo`; }
}

export class VehicleManager {

    static printVehicleDetails(vehicles: Vehicle[]) {
        vehicles.forEach(vehicle => console.log(vehicle.getDetails()));
    }
}
