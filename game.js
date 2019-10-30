import player from './player.js';
import charger from './charger.js';
import shooter from './shooter.js';
import square from './square.js';

export default class Game extends Phaser.Scene {
  constructor()
  {
    super({ key: 'main' });
    this.squarePixels = 100;
  }

  preload()
  {
    this.load.image('player', './sprites/player.png');
    this.load.image('bg', './sprites/background.png');
    this.load.image('basicEnemy', './sprites/basicEnemy.png');
    this.load.image('square', './sprites/square.png');
    this.load.image('shooter', './sprites/shooter.png');
    this.load.image('bullet', './sprites/bullet.png');
    this.cursors = this.input.keyboard.addKeys('W,A,S,D');
  }

  create()
  {
    //this.world.setBounds(0, 0, 800, 2000);
    //this.cameras.main.setViewport(0, 1000, 800, 1000);
    this.background = this.add.image(0, 0, 'bg');
    this.background.scaleX *= 10;
    this.background.scaleY *= 10;
    this.player = new player(this, 0, 0, this.squarePixels, this.squarePixels, 'player');
    this.charger_1 = new charger(this, 2, 2, this.squarePixels, this.squarePixels, 'basicEnemy', 9, 1);
    this.charger_2 = new charger(this, 2, 3, this.squarePixels, this.squarePixels, 'basicEnemy', 1, 2);
    this.shooter = new shooter(this, 5, 5, this.squarePixels, this.squarePixels, 'shooter', 'bullet', 6, 3);
    this.square = new square(this, 5, 7, this.squarePixels, this.squarePixels, 'square', 2, 4);
  }

  update(time, delta)
  {   
    if (Phaser.Input.Keyboard.JustDown(this.cursors.W))
    {
      this.player.Move(8);
      this.charger_1.Act();
      this.charger_2.Act();
      this.shooter.Act();
      this.square.Act();
    }
    
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.S))
    {
      this.player.Move(2);
      this.charger_1.Act();
      this.charger_2.Act();
      this.shooter.Act();
      this.square.Act();
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.A))
    {
      this.player.Move(4);
      this.charger_1.Act();
      this.charger_2.Act();
      this.shooter.Act();
      this.square.Act();
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.D))
    {
      this.player.Move(6);
      this.charger_1.Act();
      this.charger_2.Act();
      this.shooter.Act();
      this.square.Act();
    }
  }
}