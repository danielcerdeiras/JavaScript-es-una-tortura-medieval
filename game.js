import player from './player.js';
import enemy from './enemy.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload()
  {
    this.squarePixels = 100;
    this.load.image('player', './sprites/player.png');
    this.load.image('bg', './sprites/background.png');
    this.load.image('basicEnemy', './sprites/basicEnemy.png');
    this.cursors = this.input.keyboard.addKeys('W,A,S,D');
  }

  create()
  {
    this.background = this.add.image(0, 0, 'bg');
    this.background.scaleX *= 10;
    this.background.scaleY *= 10;
    this.player = new player(this, 100, 100, 100, 100);
    this.enemy = new enemy(this, 500, 500, 100, 100, 3);
  }

  update(time, delta)
  {   
    if (Phaser.Input.Keyboard.JustDown(this.cursors.W))
    {
      let movedPixels = 0;
      while(movedPixels < this.squarePixels)
      {
        this.player.Move(8);
        this.enemy.Move();
        movedPixels++;
      }
    }
    
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.S))
    {
      let movedPixels = 0;
      while(movedPixels < this.squarePixels)
      {
        this.player.Move(2);
        this.enemy.Move();
        movedPixels++;
      }
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.A))
    {
      let movedPixels = 0;
      while(movedPixels < this.squarePixels)
      {
        this.player.Move(4);
        this.enemy.Move();
        movedPixels++;
      }
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.D))
    {
      let movedPixels = 0;
      while(movedPixels < this.squarePixels)
      {
        this.player.Move(6);
        this.enemy.Move();
        movedPixels++;
      }
    }
  }
}