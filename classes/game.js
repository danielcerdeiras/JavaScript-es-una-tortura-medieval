import player from './player.js';
import charger from './charger.js';
import shooter from './shooter.js';
import square from './square.js';
import zigzag from './zigzag.js';
import block from './block.js';



export default class Game extends Phaser.Scene {

  constructor() {
    super('Game');
    this.squarePixels = 100;
    this.levelHeight = 10;
    this.levelWidth = 7;
  }

  init(power){
    this.power = power;
  }

  preload() {
    this.load.spritesheet('player', './sprites/player_end.png', {frameWidth: 94, frameHeight: 100 });
    this.load.spritesheet('charger', './sprites/charger_end.png', {frameWidth: 94, frameHeight: 100 });
    this.load.spritesheet('square', './sprites/square_end.png', {frameWidth: 122, frameHeight: 114 });
    this.load.spritesheet('shooter', './sprites/shooter_end.png',{frameWidth: 52, frameHeight: 72 });
    this.load.spritesheet('zigzag', './sprites/zigzag_end.png', {frameWidth: 94, frameHeight: 100 });
    this.load.spritesheet('bullet', './sprites/bullet_end.png', {frameWidth: 120, frameHeight: 128 });
    this.load.image('block_act', './sprites/block_act_end.png');//, {frameWidth: 16, frameHeight: 16 };
    this.load.image('block_deact', './sprites/block_deact_end.png');//, {frameWidth: 16, frameHeight: 16 };
    this.load.tilemapTiledJSON('tileMapPhaser', 'sprites/test.json')
    this.load.image('tileSetPhaser', './sprites/tiles_dungeon.png')
    this.cursors = this.input.keyboard.addKeys('W,A,S,D,SHIFT');
    this.load.audio('backgroundMusic', './sounds/background.wav');
    this.load.audio('block_off', './sounds/block_off.wav');
    this.load.audio('block_on', './sounds/block_on.wav');
    this.load.audio('death', './sounds/death.wav');
    this.load.audio('end_fin', './sounds/end_fin.wav');
    this.load.audio('end_ini', './sounds/end_ini.wav');
    this.load.audio('flash', './sounds/flash.wav');
    this.load.audio('movement', './sounds/movement.wav');
    this.load.audio('timeStopSound', './sounds/timeStop.wav');
  }

  create() {
    this.erasedTiles = [];
    this.playerDead = false;
    this.playerTurn = true;
    this.powerUsed = false;
    this.time = 0;
    this.blocks = [];
    this.blocks[0] = 0;
    this.enemies = [];
    this.enemies[0] = 0;

    const background_config = {
      mute: false,
      volume: 0.35,
      mod: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };

    const movementSound_config ={
      volume: 0.25,
      mod: 1,
      detune: 0,
      seek: 0,
    }

    const timeStopSound_config ={
      loop:true,
    }

    const defaultSound_config = {
      mute: false,
      volume: 1,
      mod: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }

    this.backgroundMusic = this.sound.add('backgroundMusic', background_config)
    this.block_onSound = this.sound.add('block_on', defaultSound_config);
    this.block_offSound = this.sound.add('block_off', defaultSound_config);
    this.deathSound = this.sound.add('death', defaultSound_config);
    this.end_finSound = this.sound.add('end_fin', defaultSound_config);
    this.end_iniSound = this.sound.add('end_ini', defaultSound_config);
    this.flashSound = this.sound.add('flash', defaultSound_config);
    this.movementSound = this.sound.add('movement', movementSound_config)
    this.timeStopSound = this.sound.add('timeStopSound', timeStopSound_config);


    this.map = this.make.tilemap({
      key: 'tileMapPhaser',
      tileWidth: 50,
      tileHeight: 50
    })
    this.tileset = this.map.addTilesetImage('tiles_dungeon', 'tileSetPhaser');
    this.backgroundLayer = this.map.createDynamicLayer("Capa de Patrones 1", this.tileset);
    this.groundLayer = this.map.createDynamicLayer('Pared', this.tileset);
    this.backgroundLayer.setScale(6.25);
    this.groundLayer.setScale(6.25);

    /*
    Como funciona el level:
    0 = vacio
    1 = suelo
    2 = pared
    3 = jugador
    4 = meta
    5 = bloque
    el resto = enemigos
    */

    /*this.level = [
    [2, 4, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 0, 1, 1, 2],
    [2, 1, 0, 1, 0, 1, 2],
    [2, 1, 1, 0, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 1, 2],
    [2, 1, 500, 0, 500, 1, 2],
    [2, 3, 1, 3, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2]
];*/
    this.copyLevel = [
      [2, 2, 2, 2, 2, 2, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2]
  ];

   /*this.level = [
    [2, 2, 2, 4, 2, 0, 0],
    [2, 761, 1, 1, 2, 2, 0],
    [2, 862, 0, 621, 0, 2, 0],
    [2, 1, 824, 0, 1, 2, 2],
    [2, 0, 0, 681, 1, 1, 2],
    [2, 2, 500, 1, 500, 1, 2],
    [2, 1, 1, 1, 1, 1, 2],
    [2, 968, 1, 1, 942, 1, 2],
    [2, 1, 1, 3, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2]
  ];*/

/*
  this.level = [
    [2, 2, 2, 4, 2, 0, 0],
    [2, 761, 1, 1, 2, 2, 2],
    [2, 1, 666, 1, 1, 1, 2],
    [2, 1, 624, 1, 1, 646, 2],
    [2, 1, 1, 1, 2, 2, 2],
    [2, 666, 1, 2, 2, 2, 2],
    [2, 666, 1, 1, 0, 1, 2],
    [2, 1, 1, 1, 842, 1, 2],
    [2, 662, 1, 3, 1, 2, 2],
    [2, 2, 2, 2, 2, 2, 2]
  ];
*/
  let R = 'right'
  let I = 'left'
  let D = 'down'

  let S = {type: 'floor'}
  let V = {type: 'void'}
  let P = {type: 'player'}
  let F = {type: 'finish'}
  let W = {type: 'wall'}
  let SR2 = {type: 'shooter', constructor: shooter,facing: R, mod: 2}
  let SR6 = {type: 'shooter', constructor: shooter, facing: R, mod: 6}
  let SI6 = {type: 'shooter', constructor: shooter, facing: I, mod: 6}
  let SD4 = {type: 'shooter', constructor: shooter, facing: D, mod: 4}
  let CD1 = {type: 'charger', constructor: charger,facing: D, mod: 1}
  let SQID = {type: 'square', constructor: square,facing: I, mod: D}


  this.level = [
    [W, W, W, F, W, V, V],
    [W, CD1, S, S, W, W, W],
    [W, S, SR6, S, S, S, W],
    [W, S, SD4, S, S, SI6, W],
    [W, S, S, S, W, W, W],
    [W, SR6, S, W, W, W, W],
    [W, SR6, S, S, V, S, W],
    [W, S, S, S, SQID, S, W],
    [W, SR2, S, P, S, W, W],
    [W, W, W, W, W, W, W]
  ];

  // for(j) {
  //   switch(j.type) {
  //     'wall':
  //     'cth':
  //       if(j.facing === R) {

  //       }
  //   }
  // }

  // this.level = [
  //   [W, W, 2, 4, 2, 0, 0],
  //   [2, 761, 1, 1, 2, 2, 2],
  //   [2, 1, 666, 1, 1, 1, 2],
  //   [2, 1, 624, 1, 1, 646, 2],
  //   [2, 1, 1, 1, 2, 2, 2],
  //   [2, CD, 1, 2, 2, 2, 2],
  //   [2, 666, 1, 1, 0, 1, 2],
  //   [2, 1, 1, 1, 842, 1, 2],
  //   [2, 662, 1, 3, 1, 2, 2],
  //   [2, 2, 2, 2, 2, 2, 2]
  // ];

    /*this.level = [
    [2, 2, 2, 2, 2, 4, 2],
    [2, 0, 721, 1, 924, 1, 2],
    [2, 0, 1, 1, 0, 1, 2],
    [2, 624, 1, 1, 986, 1, 2],
    [2, 1, 1, 2, 2, 2, 2],
    [2, 1, 2, 2, 2, 2, 2],
    [2, 1, 0, 1, 1, 824, 2],
    [2, 500, 0, 500, 1, 1, 2],
    [2, 1, 1, 3, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2]
  ];*/

    this.Copy(this.level, this.copyLevel);

    this.backgroundMusic.play();
    this.levelLoad();
    this.cursors.W.on('down', event => { this.Turn('up'); })
    this.cursors.S.on('down', event => { this.Turn('down'); })
    this.cursors.A.on('down', event => { this.Turn('left'); })
    this.cursors.D.on('down', event => { this.Turn('right'); })
    this.cursors.SHIFT.on('down', event => { this.UsePower(); })
    this.foreground = this.map.createDynamicLayer('OBj', this.tileset);
    this.foreground.setScale(6.25);
  }

  update(time, delta) {
    if (!(!this.playerDead && this.time > 150))
      this.time += delta;

    this.checkDeath();
    this.checkVictory();
  }

  Turn(dir) {
    if (!this.playerDead && this.time > 150) {
      if (this.player.Move(dir) && (this.player.power != 'timeStop' || !this.player.powerUsed)){
        for (let i = 1; i <= this.enemies[0]; i++)
          if (!this.enemies[i].frozen)this.enemies[i].Act();

        this.timeStopSound.stop();
      }
      this.player.powerUsed = false;
      this.time = 0;
    }
    if (!this.levelFolded)
        this.Copy(this.level, this.copyLevel);
  }

  UsePower() {
    if (!this.playerDead && this.time > 150)
      this.player.UsePower();
  }

  levelLoad() {
    let px, py;
    let fil = this.level.length;
    let col = this.level[0].length;

    function haz(scene, tipo, i, j) {
      scene.enemies[scene.enemies[0]] = new tipo.constructor(scene.level, scene, j, i, scene.squarePixels, scene.squarePixels, scene.level[i][j].type , scene.level[i][j].facing , scene.level[i][j].mod);
   }

    for (let i = 0; i < fil; i++) {
      for (let j = 0; j < col; j++) {
        switch (this.level[i][j].type) {
          case 'player':
            px = j;
            py = i;
            this.level[i][j] = {type: 'floor'} ;
            break;

          default:

            if(this.level[i][j].type != 'wall' && this.level[i][j].type != 'void' && this.level[i][j].type != 'floor'){
              haz(this,this.level[i][j].type,i,j);
              if(this.level[i][j].type != 'finish' && this.level[i][j].type != 'player' && this.level[i][j].type != 'block')
                this.enemies[0]++;
            }

            /*switch (Math.floor(this.level[i][j] / 100)) {
              case 5:
                this.blocks[0]++;
                if (Math.floor(temp / 10) == 0)
                  this.blocks[this.blocks[0]] = new block(this, j, i, this.squarePixels, this.squarePixels, 'block_deact', Math.floor(temp / 10), temp % 10);
                else
                  this.blocks[this.blocks[0]] = new block(this, j, i, this.squarePixels, this.squarePixels, 'block_act', Math.floor(temp / 10), temp % 10);
                break;
              case 6:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new shooter(this.level, this, j, i, this.squarePixels, this.squarePixels, 'shooter', 'bullet', Math.floor(temp / 10), temp % 10);
                break;

              case 7:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new charger(this.level, this, j, i, this.squarePixels, this.squarePixels, 'charger', Math.floor(temp / 10), temp % 10);
                break;

              case 8:
                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new square(this.level, this, j, i, this.squarePixels, this.squarePixels, 'square', Math.floor(temp / 10), temp % 10);
                break;

              case 9:

                this.enemies[0]++;
                this.enemies[this.enemies[0]] = new zigzag(this.level, this, j, i, this.squarePixels, this.squarePixels, 'zigzag', Math.floor(temp / 10), temp % 10);
                break;
            }*/

            break;
        }
      }
    }
    this.player = new player(this.level, this, px, py, this.squarePixels, this.squarePixels, 'player', this.power);
    this.startingX = px;
    this.startingY = py;
  }

  checkDeath() //Si el jugador está en un objeto que lo mata lo manda al spawn point
  {
    if (!this.playerDead) {
      let entity = this.level[this.player.posY][this.player.posX];
      if (entity.type != 'floor' && entity.type != 'finish') // TODO sin numeros
      {
        this.player.KillText(this.startingX, this.startingY);
        this.playerDead = true;
        let tween = this.tweens.add({
          targets: this.player,
          x: (this.startingX * this.squarePixels) + (this.squarePixels / 2),
          y: (this.startingY * this.squarePixels) + (this.squarePixels / 2),
          ease: 'Power1',
          duration: 700,
        });
        this.deathSound.play();
      }
    }

    else
      if (this.time >= 700)
        this.scene.restart();
  }

  checkVictory() {
    let entity = this.level[this.player.posY][this.player.posX];
    if (entity.type == 'finish')
    {
    this.end_iniSound.play();
    this.end_finSound.play();
    this.scene.start('End');
    this.backgroundMusic.stop();
    }
  }



  //Métodos relacionados con el mapa y su modificación
  BlockCollision(x, y) {
    let found = false;
    for (let i = 1; i <= this.blocks[0] && !found; i++) {
      if (this.blocks[i].posX == x)
        if (this.blocks[i].posY == y) {
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
    for (let i = 1; i <= this.blocks[0] && cont < 2; i++) {
      if (this.blocks[i].link == link) {
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
      {
        let pos1 = this.blocks[block1].posY;
        let pos2 = this.blocks[block2].posY;
        this.blocks[block1].CorrectPosition((pos2 - pos1 - 1), 'vertical', true);
        this.FoldLevel(pos1, pos2, 'vertical');
      }
      else
      {
        let pos1 = this.blocks[block1].posX;
        let pos2 = this.blocks[block2].posX;
        this.blocks[block1].CorrectPosition((pos2 - pos1 - 1), 'horizontal', true);
        this.FoldLevel(pos1, pos2, 'horizontal');
      }
    }
    else if (cont === 1) // poner 3 iguales siempre que se pueda
    {
      if (this.blocks[block1].folding)
      {
        this.blocks[block1].folding = false;
        this.blocks[block2].folding = false;

        if (this.blocks[block1].posX == this.blocks[block2].posX)
        {
          let pos1 = this.blocks[block1].oriY;
          let pos2 = this.blocks[block2].oriY;
          this.blocks[block1].CorrectPosition(pos2 - pos1 - 1, 'vertical', false);
          this.UnfoldLevel(pos1, pos2, 'vertical');
          this.UpdateEntitiesUnfold(pos1, pos2, 'vertical');
        }
        else
        {
          let pos1 = this.blocks[block1].oriX;
          let pos2 = this.blocks[block2].oriX;
          this.blocks[block1].CorrectPosition(pos2 - pos1 - 1, 'horizontal', false);
          //this.UnfoldLevel(this.blocks[block1].posX, this.blocks[block2].posX, 'horizontal');
          this.UnfoldLevel(pos1, pos2, 'horizontal');
          this.UpdateEntitiesUnfold(pos1, pos2, 'horizontal');
        }
      }
    }
  }

  FoldLevel(pos1, pos2, dir)
  {
    this.levelFolded = true;
    this.block_onSound.play();
    let tile;
    if (dir == 'horizontal') // 3 iguales
    {
      this.EraseTiles(pos1 + 1, (pos2 - pos1 - 1), 0, this.levelHeight);

      for (let i = pos2 - (pos2 - pos1); i >= 0; i--)
        for (let j = 0; j < this.levelHeight; j++)
        {
          this.level[j][i + (pos2 - pos1 - 1)] = this.copyLevel[j][i];

          tile = this.backgroundLayer.getTileAt(i, j);
          this.backgroundLayer.putTileAt(tile, i + (pos2 - pos1 - 1), j);
          this.backgroundLayer.removeTileAt(i, j);

          tile = this.groundLayer.getTileAt(i, j);
          this.groundLayer.putTileAt(tile, i + (pos2 - pos1 - 1), j);
          this.groundLayer.removeTileAt(i, j);

          tile = this.foreground.getTileAt(i, j);
          this.foreground.putTileAt(tile, i + (pos2 - pos1 - 1), j);
          this.foreground.removeTileAt(i, j);
        }
    }
    else
    {
      this.EraseTiles(0, this.levelWidth, pos1 + 1, (pos2 - pos1 - 1));

      // ESTO SON NUMEROS MAGICOS !!!!
      for (let i = 6; i >= 0; i--) //Los bucles son inversos para que no se sobreescriban los tiles
        for (let j = pos2 - 3; j >= 0; j--)
        {
          this.level[j + (pos2 - pos1 - 1)][i] = this.copyLevel[j][i];

          tile = this.backgroundLayer.getTileAt(i, j);
          this.backgroundLayer.putTileAt(tile, i, j + (pos2 - pos1 - 1));
          this.backgroundLayer.removeTileAt(i, j);

          tile = this.groundLayer.getTileAt(i, j);
          this.groundLayer.putTileAt(tile, i, j + (pos2 - pos1 - 1));
          this.groundLayer.removeTileAt(i, j);

          tile = this.foreground.getTileAt(i, j);
          this.foreground.putTileAt(tile, i, j + (pos2 - pos1 - 1));
          this.foreground.removeTileAt(i, j);
      }
    }
    this.UpdateEntitiesFold(pos1, pos2, dir);
  }

  UnfoldLevel(pos1, pos2, dir)
  {
    this.levelFolded = false;
    let tile;
    this.block_offSound.play();
    if (dir == 'horizontal')
    {
      for (let i = 0; i < pos2 - (pos2 - pos1 - 1); i++)
        for (let j = 0; j < this.levelHeight; j++)
        {
          this.level[j][i] = this.level[j][i + (pos2 - pos1 - 1)];

          tile = this.backgroundLayer.getTileAt(i + (pos2 - pos1 - 1), j);
          this.backgroundLayer.putTileAt(tile, i, j);
          this.backgroundLayer.removeTileAt(i + (pos2 - pos1 - 1), j);

          tile = this.groundLayer.getTileAt(i + (pos2 - pos1 - 1), j);
          this.groundLayer.putTileAt(tile, i, j);
          this.groundLayer.removeTileAt(i + (pos2 - pos1 - 1), j);

          tile = this.foreground.getTileAt(i + (pos2 - pos1 - 1), j);
          this.foreground.putTileAt(tile, i, j);
          this.foreground.removeTileAt(i + (pos2 - pos1 - 1), j);
        }

      this.RecoverTiles(pos1 + 1, (pos2 - pos1 - 1), 0, this.levelHeight);
    }
    else
    {
      for (let i = 0; i < this.levelWidth; i++)
        for (let j = 0; j < pos2 - 2; j++)
        {
          this.level[j][i] = this.level[j + (pos2 - pos1 - 1)][i];

          tile = this.backgroundLayer.getTileAt(i, j + (pos2 - pos1 - 1));
          this.backgroundLayer.putTileAt(tile, i, j);
          this.backgroundLayer.removeTileAt(i, j + (pos2 - pos1 - 1));

          tile = this.groundLayer.getTileAt(i, j + (pos2 - pos1 - 1));
          this.groundLayer.putTileAt(tile, i, j);
          this.groundLayer.removeTileAt(i, j + (pos2 - pos1 - 1));

          tile = this.foreground.getTileAt(i, j + (pos2 - pos1 - 1));
          this.foreground.putTileAt(tile, i, j);
          this.foreground.removeTileAt(i, j + (pos2 - pos1 - 1));
        }

      this.RecoverTiles(0, this.levelWidth, pos1 + 1, (pos2 - pos1 - 1));
    }
    this.RestoreLevel(pos1, pos2, dir);
  }

  EraseTiles(x, height, y, width)
  {
    this.erasedTiles = []
    let cont = 0;
    for (let i = x; i < height + x; i++)
      for (let j = y; j < width + y; j++)
      {
        this.erasedTiles[cont] = this.backgroundLayer.getTileAt(i, j); cont++;
        this.backgroundLayer.removeTileAt(i, j);
        this.erasedTiles[cont] = this.foreground.getTileAt(i, j); cont++;
        this.foreground.removeTileAt(i, j);
        this.erasedTiles[cont] = this.groundLayer.getTileAt(i, j); cont++;
        this.groundLayer.removeTileAt(i, j);
      }
  }

  RecoverTiles(x, height, y, width)
  {
    let cont = 0;
    for (let i = x; i < height + x; i++)
      for (let j = y; j < width + y; j++)
      {
        this.backgroundLayer.putTileAt(this.erasedTiles[cont], i, j); cont++;
        this.foreground.putTileAt(this.erasedTiles[cont], i, j); cont++;
        this.groundLayer.putTileAt(this.erasedTiles[cont], i, j); cont++;
      }
  }

  UpdateEntitiesFold(pos1, pos2, dir)
  {
    let dist = pos2 - pos1 - 1;
    if (dir == 'horizontal')
    {
      if (this.player.posX <= pos1 && this.player.posX < pos2)
        this.player.CorrectPosition(dist, dir);
      else if (this.player.posX < pos2)
      {
        this.player.Displace(dir);
        if (this.player.posX < pos2 - 1)
          this.player.CorrectPosition(pos2 - pos1 - 2, dir);
      }

      for (let i = 1; i <= this.enemies[0]; i++)
      {
        if (this.enemies[i].posX > pos1 && this.enemies[i].posX < pos2)
          this.enemies[i].Freeze(false);
        else if (this.enemies[i].posX <= pos1)
          this.enemies[i].CorrectPosition(dist, dir);
      }
    }
    else
    {
      if (this.player.posY <= pos1 && this.player.posY < pos2)
        this.player.CorrectPosition(dist, dir);
        else if (this.player.posY < pos2)
        {
          this.player.Displace(dir);
          if (this.player.posY < pos2 - 1)
            this.player.CorrectPosition(pos2 - pos1 - 2, dir);
        }

      for (let i = 1; i <= this.enemies[0]; i++)
      {
        if (this.enemies[i].posY > pos1 && this.enemies[i].posY < pos2)
          this.enemies[i].Freeze(false);
        else if (this.enemies[i].posY <= pos1)
          this.enemies[i].CorrectPosition(dist, dir);
      }
    }
  }

  UpdateEntitiesUnfold(pos1, pos2, dir)
  {
    let dist = pos2 - pos1 - 1;
    if (dir == 'horizontal')
    {
      if (this.player.posX <= (pos1 + dist) && this.player.posX < pos2)
        this.player.CorrectPosition(-dist, dir);
      else if (this.player.posX < pos2)
      {
        this.player.Displace(dir);
        if (this.player.posX < pos2 - 1)
          this.player.CorrectPosition(pos2 - pos1 - 2, dir);
      }

      for (let i = 1; i <= this.enemies[0]; i++)
      {
        if (this.enemies[i].posX == (pos1 + dist) && this.enemies[i].frozen)
          this.enemies[i].Freeze(true);
        else if (this.enemies[i].posX <= (pos1 + dist))
          this.enemies[i].CorrectPosition(-dist, dir);
      }
    }
    else
    {
      if (this.player.posY <= (pos1 + dist) && this.player.posY < pos2)
        this.player.CorrectPosition(-dist, dir);
        else if (this.player.posY < pos2)
        {
          this.player.Displace(dir);
          if (this.player.posY < pos2 - 1)
            this.player.CorrectPosition(pos2 - pos1 - 2, dir);
        }

      for (let i = 1; i <= this.enemies[0]; i++)
      {
        if (this.enemies[i].posY == (pos1 + dist) && this.enemies[i].frozen)
          this.enemies[i].Freeze(true);
        else if (this.enemies[i].posY <= (pos1 + dist))
          this.enemies[i].CorrectPosition(-dist, dir);
      }
    }
  }

  Copy(from, to)
  {
    for (let i = 0; i < this.levelHeight; i++)
      for (let j = 0; j < this.levelWidth; j++)
        to[i][j] = from[i][j];
  }

  RestoreLevel(pos1, pos2, dir)
  {
    if (dir == 'horizontal')
    {
      for (let i = 0; i < this.levelHeight; i++)
        for (let j = 0; j < this.levelWidth; j++)
          if (j > pos1 && j < pos2)
            this.level[i][j] = this.copyLevel[i][j];
    }
    else
    {
      for (let i = 0; i < this.levelHeight; i++)
        for (let j = 0; j < this.levelWidth; j++)
          if (i > pos1 && i < pos2)
            this.level[i][j] = this.copyLevel[i][j];
    }
  }
}