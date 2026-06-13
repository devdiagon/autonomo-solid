interface Eater  { eat(): void; }
interface Flyer  { fly(): void; }
interface Swimmer { swim(): void; }

export class Toucan implements Eater, Flyer {
    eat() { console.log('El Tucán está comiendo frutas.'); }
    fly() { console.log('El Tucán vuela sobre la selva.'); }
}

export class Hummingbird implements Eater, Flyer {
    eat() { console.log('El Colibrí busca néctar.'); }
    fly() { console.log('El Colibrí aletea rápidamente.'); }
}

export class Ostrich implements Eater, Swimmer {
    eat()  { console.log('El Avestruz come hierbas.'); }
    swim() { console.log('El Avestruz puede nadar si es necesario.'); }
}

export class Penguin implements Eater, Swimmer {
    eat()  { console.log('El Pingüino come peces.'); }
    swim() { console.log('El Pingüino nada con gran habilidad.'); }
}
