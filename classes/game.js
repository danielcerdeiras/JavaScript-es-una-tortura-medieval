import player from './player.js';
import charger from './charger.js';
import shooter from './shooter.js';
import square from './square.js';
import zigzag from './zigzag.js';
import block from './block.js';

export default class Game extends Phaser.Scene
{
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
    this.load.image('charger', './sprites/charger.png');
    this.load.image('square', './sprites/square.png');
    this.load.image('shooter', './sprites/shooter.png');
    this.load.image('zigzag', './sprites/zigzag.png');
    this.load.image('bullet', './sprites/bullet.png');
    this.load.image('block', './sprites/block.png');
    this.load.tilemapTiledJSON('tileMapPhaser','sprites/test.json')
    this.load.image('tileSetPhaser','./sprites/tiles_dungeon.png')
    this.cursors = this.input.keyboard.addKeys('W,A,S,D,SHIFT');
  }

  create()
  {
    this.playerDead = false;
    this.playerTurn = true;
    this.powerUsed = false;
    this.time = 0;
    this.blocks = [];
    this.blocks[0] = 0;
    this.enemies = [];
    this.enemies[0] = 0;

    this.map = this.make.tilemap({
      key: 'tileMapPhaser',
      tileWidth:50,
      tileHeight:50
    })
    this.tileset = this.map.addTilesetImage('tiles_dungeon','tileSetPhaser',);
    this.backgroundLayer = this.map.createDynamicLayer("Capa de Patrones 1", this.tileset);
    this.groundLayer = this.map.createDynamicLayer('Pared' , this.tileset);
    this.foreground =  this.map.createDynamicLayer('OBj', this.tileset);
   
    /*
    Como funciona el level:
    0 = vacio
    1 = suelo
    2 = pared
    3 = jugador
    4 = meta
    el resto = enemigos
    */

   this.copyLevel = [
    [2,2,2,2,2,0,0],
    [2,1,1,4,2,2,2],
    [2,761,1,1,1,1,2],
    [2,1,1,1,1,1,2],
    [2,1,1,1,2,2,2],
    [2,1,1,2,2,2,2],
    [2,1,501,1,500,1,2],
    [2,1,1,1,1,1,2],
    [2,1,501,3,500,1,2],
    [2,2,2,2,2,2,2]
    ];
    
    this.level = this.copyLevel;
    this.levelLoad();
    this.cursors.W.on('down', event => {this.Turn(8);})
    this.cursors.S.on('down', event => {this.Turn(2);})
    this.cursors.A.on('down', event => {this.Turn(4);})
    this.cursors.D.on('down', event => {this.Turn(6);})
    this.cursors.SHIFT.on('down', event => {this.UsePower();})
  }

  update(time, delta)
  {
    if (!(!this.playerDead && this.time > 150))
      this.time += delta;

    this.checkDeath();
    this.checkVictory();
  }

  Turn(dir)
  {
    if (!this.playerDead && this.time > 150)
    {
      if (this.player.Move(dir) && (this.player.power != 'timeStop' || !this.player.powerUsed))
          for (let i = 1; i <= this.enemies[0]; i++)
            this.enemies[i].Act();
        
      this.player.powerUsed = false;
      this.time = 0;

      if (!this.levelFolded)
        this.copyLevel = this.level;
    }
  }

  UsePower()
  {
    if (!this.playerDead && this.time > 150)
      this.player.UsePower();
  }

  levelLoad()
  {
    let px, py, fx, fy;
    let fil = this.level.length;
    let col = this.level[0].length;

    for (let i = 0; i < fil; i++ ){
      for (let j = 0; j < col; j++ ){
        switch(this.level[i][j]){
          case 3:
            px = j;
            py = i;
            this.level[i][j] = 1;
            break;

          case 4:
            fx = j;
            fy = i;
            break;

          default:
            let temp = this.level[i][j]%100;
            switch(Math.floor(this.level[i][j]/100))
            {
              case 5:
                this.blocks[0]++;
                this.blocks[this.blocks[0]] = new block(this, j, i, this.squarePixels, this.squarePixels, 'block', Math.floor(temp/10), temp%10);
                break;
              case 6:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new shooter(this.level, this, j, i, this.squarePixels, this.squarePixels, 'shooter', 'bullet', Math.floor(temp/10), temp%10);
                break;

              case 7:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new charger(this.level, this, j, i, this.squarePixels, this.squarePixels, 'charger', Math.floor(temp/10), temp%10);
                break;

              case 8:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new square(this.level, this, j, i, this.squarePixels, this.squarePixels, 'square', Math.floor(temp/10), temp%10);
                break;

              case 9:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new zigzag(this.level, this, j, i, this.squarePixels, this.squarePixels, 'zigzag', Math.floor(temp/10), temp%10);
                break;
            }
            break;    
        }
      } 
    }
    this.player = new player(this.level, this, px, py, this.squarePixels, this.squarePixels, 'player', 'flash');
    this.startingX = px;
    this.startingY = py;

    //Comprobar si el mundo está plegado
  }

  checkDeath() //Si el jugador está en un objeto que lo mata lo manda al spawn point
  {
    if (!this.playerDead)
    {
      let entity = this.level[this.player.posY][this.player.posX];
      if (entity !=1 && entity != 4 && entity / 100 != 5)
      {
        this.playerDead = true;
        let tween = this.tweens.add({
          targets: this.player,
          x: (this.startingX * this.squarePixels) + (this.squarePixels / 2),
          y: (this.startingY * this.squarePixels) + (this.squarePixels / 2),
          ease: 'Power1',
          duration: 700,
      });
      }
    }
    
    else
      if (this.time >= 700)
        this.scene.restart();
  }

  checkVictory()
  {
    let entity = this.level[this.player.posY][this.player.posX];
    if (entity == 4)
      ; //change level
  }

  BlockCollision(x, y)
  {
    let found = false;
    for(let i = 1; i <= this.blocks[0] && !found; i++)
    {
      if (this.blocks[i].posX == x)
        if (this.blocks[i].posY == y)
        {
          this.blocks[i].ChangeState();
          this.CheckBlocks(this.blocks[i].link);
          found = true;
        }
    }
  }
  
  CheckBlocks(link)
  {
    let block1 = -1;
    let block2 = -1;
    let cont = 0;
    for(let i = 1; i <= this.blocks[0] && cont < 2; i++)
    {
      if (this.blocks[i].link == link)
      {
        if (block1 < 0) block1 = i;
        else block2 = i;

        if (this.blocks[i].active) cont++;
      }
    }

    if (cont >= 2)
    {
      this.blocks[block1].folding = true;
      this.blocks[block2].folding = true;

      if (this.blocks[block1].posX == this.blocks[block2].posX)
        console.log("Se pliega");//FoldLevel(this.blocks[block1].posY, this.blocks[block2].posY);
      else
        console.log("Se pliega");//FoldLevel(this.blocks[block1].posX, this.blocks[block2].posX);
    }
    else if (cont == 1)
    {
      if (this.blocks[block1].folding)
      {
        this.blocks[block1].folding = false;
        this.blocks[block2].folding = false;

        if (this.blocks[block1].posX == this.blocks[block2].posX)
          console.log("Se expande");//UnfoldLevel(this.blocks[block1].posY, this.blocks[block2].posY);
        else
          console.log("Se expande");//UnfoldLevel(this.blocks[block1].posX, this.blocks[block2].posX);
      }
    }
  }

  FoldLevel()
  {
    this.levelFolded = true;
  }

  UnfoldLevel()
  {
    this.levelFolded = false;
  }
}