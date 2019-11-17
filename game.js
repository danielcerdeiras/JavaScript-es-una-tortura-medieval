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
    this.load.image('end','./sprites/end.png');
    this.load.image('wall','./sprites/wall.png');
    this.load.image('void','./sprites/void.png');
    this.load.image('ground','./sprites/ground.png');
    this.load.image('player', './sprites/player.png');
    this.load.image('bg', './sprites/background.png');
    this.load.image('basicEnemy', './sprites/basicEnemy.png');
    this.load.image('square', './sprites/square.png');
    this.load.image('shooter', './sprites/shooter.png');
    this.load.image('zigzag', './sprites/zigzag.png');
    this.load.image('bullet', './sprites/bullet.png');
    this.cursors = this.input.keyboard.addKeys('W,A,S,D,SHIFT');
  }

  create()
  {
    this.powerUsed = false;
    this.enemies = [];
    this.enemies[0] = 0;

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
    [2,1,1,1,2,2,2],
    [2,562,1,2,2,2,2],
    [2,564,1,1,0,1,2],
    [2,1,1,1,1,1,2],
    [2,564,1,3,1,1,2],
    [2,2,2,2,2,2,2]
    ];
      
    this.levelLoad();
  }

  update(time, delta)
  {   
    if (Phaser.Input.Keyboard.JustDown(this.cursors.SHIFT))
    {
      this.player.UsePower();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.W))
    {
      if (this.player.power != 'timeStop' || !this.player.powerUsed)
        for (let i = 1; i <= this.enemies[0]; i++)
          this.enemies[i].Act();

      this.player.Move(8,this.level);
    }
    
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.S))
    {
      if (this.player.power != 'timeStop' || !this.player.powerUsed)
        for (let i = 1; i <= this.enemies[0]; i++)
          this.enemies[i].Act();

      this.player.Move(2,this.level);
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.A))
    {
      if (this.player.power != 'timeStop' || !this.player.powerUsed)
        for (let i = 1; i <= this.enemies[0]; i++)
          this.enemies[i].Act();

      this.player.Move(4,this.level);
    }

    else if (Phaser.Input.Keyboard.JustDown(this.cursors.D))
    {
      if (this.player.power != 'timeStop' || !this.player.powerUsed)
        for (let i = 1; i <= this.enemies[0]; i++)
          this.enemies[i].Act();

      this.player.Move(6,this.level);
    }

   if(this.playerDead()) this.scene.restart();
   else if (this.playerWon());
  }

  levelLoad(){
    let px, py, fx, fy;
    let fil = this.level.length;
    let col = this.level[0].length;

    for (let i = 0; i < fil; i++ ){
      for (let j = 0; j < col; j++ ){
        switch(this.level[i][j]){
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
            this.level[i][j] = 1;
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
            let temp = this.level[i][j]%100;
            
            switch(Math.floor(this.level[i][j]/100))
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
              case 7:{
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new square(this, j, i, this.squarePixels, this.squarePixels, 'square', Math.floor(temp/10), temp%10);
                break;
              }
              case 8:{
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new zigzag(this, j, i, this.squarePixels, this.squarePixels, 'zigzag', Math.floor(temp/10), temp%10);
                break;
              }
            }
          }        
        }
        this.background.setOrigin(0,0);
      } 
    }
    this.player = new player(this, px, py, this.squarePixels, this.squarePixels, 'player', 'timeStop');
    
  }

  playerDead()
  {
    let entity = this.level[this.player.posY][this.player.posX];
    return (entity !=1 && entity != 4);
  }

  playerWon()
  {
    let entity = this.level[this.player.posY][this.player.posX];
    return (entity == 4);
  }
}