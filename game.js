import player from './player.js';
import enemy from './enemy.js';

let squarePixels = 50;

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload()
  {
    this.load.image('player', './sprites/player.png');
    this.load.image('bg', './sprites/background.png');
    this.load.image('basicEnemy', './sprites/basicEnemy.png');
    this.cursors = scene.input.keyboard.addKeys('W,A,S,D');
  }

  create()
  {
    this.background = this.add.image(0, 0, 'bg');
    this.background.scaleX *= 10;
    this.background.scaleY *= 10;
    this.player = new player(this, 300, 300, 100, 100);
    this.enemy = new enemy(this, 300, 300, 100, 100, 6);
  }

  update(time, delta)
  {   
    if (this.cursors.W.isDown)
    {
      let movedPixels = 0;
      while(movedPixels < squarePixels)
      {
        this.player(8);
        this.enemy(2);
        movedPixels++;
      }
    }
    else if (this.cursors.S.isDown)
    {
      let movedPixels = 0;
      while(movedPixels < squarePixels)
      {
        this.player(2);
        this.enemy(8);
        movedPixels++;
      }
    }
    else if (this.cursors.A.isDown)
    {
      let movedPixels = 0;
      while(movedPixels < squarePixels)
      {
        this.player(4);
        this.enemy(6);
        movedPixels++;
      }
    }
    else if (this.cursors.D.isDown)
    {
      let movedPixels = 0;
      while(movedPixels < squarePixels)
      {
        this.player(6);
        this.enemy(4);
        movedPixels++;
      }
    }
  }
}