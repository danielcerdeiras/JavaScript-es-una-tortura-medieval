export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
  }

  create() {
  }

  update(time, delta) {    
  }
}

/*class Enemigo
{
  //dir: 8 direcciones. 5 = todas direcciones; 1 - 9 direcciones singulares; n > 9 combinación de cada dígito
  constructor(pos, tipo, dir)
  {
    this.tipo = tipo;
    this.dir = dir;
    this.mov = 0;
  }

  constructor(pos, tipo, mov, dir)
  {
    this.tipo = tipo;
    this.mov = mov;
    this.dir = dir;
  }
}*/