import player from './player.js';
import charger from './charger.js';
import shooter from './shooter.js';
import square from './square.js';
import zigzag from './zigzag.js';

export default class Game extends Phaser.Scene {
  constructor()
  {
    super({ key: 'main' });
    this.squarePixels = 100;
  }

  preload()
  {
    this.level = [];
    this.load.image('end','./sprites/end.png');
    this.load.image('wall','./sprites/wall.png');
    this.load.image('void','./sprites/void.png');
    this.load.image('ground','./sprites/ground.png');
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
    this.enemies = [];
    this.enemies[0] = 0;

    /*
    this.enemies[1] = new charger(this, 2, 2, this.squarePixels, this.squarePixels, 'basicEnemy', 9, 1); this.enemies[0]++;
    this.enemies[2] = new charger(this, 2, 3, this.squarePixels, this.squarePixels, 'basicEnemy', 1, 2); this.enemies[0]++;
    this.enemies[3] = new shooter(this, 5, 5, this.squarePixels, this.squarePixels, 'shooter', 'bullet', 6, 3); this.enemies[0]++;
    this.enemies[4] = new square(this, 6, 1, this.squarePixels, this.squarePixels, 'square', 2, 4); this.enemies[0]++;
    this.enemies[5] = new zigzag(this, 0, 7, this.squarePixels, this.squarePixels, 'square', 6, 8); this.enemies[0]++;
    */


    /*
    Como funciona el level:
    0 = vacio
    1 = suelo
    2 = pared
    3 = jugador
    4 = meta
    el resto = enemigos
    */

   this.level = [
    [2,2,2,2,2,0,0],
    [2,1,1,4,2,2,2],
    [2,1,528,1,1,1,2],
    [2,1,1,1,1,548,2],
    [2,1,1,2,2,2,2],
    [2,562,1,2,2,2,2],
    [2,564,1,1,0,1,2],
    [2,1,1,1,1,1,2],
    [2,564,1,3,1,1,2],
    [2,2,2,2,2,2,2]
    ];
      
    this.levelChange(this.level);
  }

  update(time, delta)
  {   
    if (Phaser.Input.Keyboard.JustDown(this.cursors.W))
    {
      this.player.Move(8,this.level);
      
      for (let i = 1; i <= this.enemies[0]; i++)
        this.enemies[i].Act();
    }
    
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.S))
    {
      this.player.Move(2,this.level);
      
      for (let i = 1; i <= this.enemies[0]; i++)
        this.enemies[i].Act();
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.A))
    {
      this.player.Move(4,this.level);
      
      for (let i = 1; i <= this.enemies[0]; i++)
        this.enemies[i].Act();
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.D))
    {
      this.player.Move(6,this.level);
      
      for (let i = 1; i <= this.enemies[0]; i++)
        this.enemies[i].Act();
    }
  }

  levelChange(level){
    let px, py, fx,fy;
    let fil = level.length;
    let col = level[0].length;

    for (let i = 0; i < fil; i++ ){
      for (let j = 0; j < col; j++ ){
        switch(level[i][j]){
          case 0:{
            this.background = this.add.image(j*this.squarePixels, i*this.squarePixels, 'void');
            break;
          }
          case 1:{
            this.background = this.add.image(j*this.squarePixels, i*this.squarePixels, 'ground');
            break;
          }
          case 2:{
            this.background = this.add.image(j*this.squarePixels, i*this.squarePixels, 'wall');
            break;
          }
          case 3:{
            this.background = this.add.image(j*this.squarePixels, i*this.squarePixels, 'ground');
            px = j;
            py = i;
            break;
          }
          case 4:{
            this.background = this.add.image(j*this.squarePixels, i*this.squarePixels, 'end'); //La textura cambiará a 'ground' una vez se implemente la clase finish
            fx = j;
            fy = i;
            break;
          }
          default:{
            this.background = this.add.image(j*this.squarePixels, i*this.squarePixels, 'ground');
            let temp = level[i][j]%100;
            
            switch(Math.floor(level[i][j]/100))
            {
              case 5:{
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new shooter(this.level, this, j, i, this.squarePixels, this.squarePixels, 'shooter', 'bullet', Math.floor(temp/10), temp%10);
                break;
              }
              case 6:{
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new charger(this.level, this, j, i, this.squarePixels, this.squarePixels, 'basicEnemy', Math.floor(temp/10), temp%10);
                break;
              }
              
            }
          }        
        }
        this.background.setOrigin(0,0);
      } 
    }

    this.player = new player(this, px, py, this.squarePixels, this.squarePixels, 'player');
  }
}