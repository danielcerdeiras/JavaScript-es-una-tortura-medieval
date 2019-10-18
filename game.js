import player from './player.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload()
  {
    this.load.image('player', './sprites/player.png');
    this.load.image('bg', './sprites/background.png');
    this.load.image('basicEnemy', './sprites/basicEnemy.png');
  }

  create()
  {
    this.background = this.add.image(0, 0, 'bg');
    this.background.scaleX *= 10;
    this.background.scaleY *= 10;
    this.player = new player(this, 300, 300, 100, 100);
  }

  update(time, delta)
  {   
    this.player.move();
  }
}