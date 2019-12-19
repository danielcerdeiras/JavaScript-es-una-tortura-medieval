import {R, L, U, D, F, V, P, E, W, SR2, SR6, SL6, SD4, CD1, SQLD, SQDL, ZDL, ZUR, B00} from './values.js';
import player from './player.js';
import charger from './charger.js';
import shooter from './shooter.js';
import square from './square.js';
import zigzag from './zigzag.js';
import block from './block.js';


export default class Game extends Phaser.Scene {

  static levels = [
    [
      [W, W, W, E, W, V, V],
      [W, CD1, F, F, W, W, W],
      [W, F, SR6, F, F, F, W],
      [W, F, SD4, F, F, SL6, W],
      [W, F, F, F, W, W, W],
      [W, SR6, F, W, W, W, W],
      [W, SR6, F, F, V, SQLD, W],
      [W, F, F, F, F, F, W],
      [W, SR2, F, P, F, W, W],
      [W, W, W, W, W, W, W]
    ],
    [
      [W, W, W, W, W, E, W],
      [W, V, CD1, F, ZDL, F, W],
      [W, V, F, F, V, F, W],
      [W, SD4, F, F, ZUR, F, W],
      [W, F, F, W, W, W, W],
      [W, F, W, W, W, W, W],
      [W, F, V, F, F, SQDL, W],
      [W, B00, V, B00, F, F, W],
      [W, F, F, P, F, F, W],
      [W, W, W, W, W, W, W]
    ]/*,
    [
      [W, W, W, E, W, V, V],
      [W, CR1, F, F, W, W, V],
      [W, SRD, V, SD1, V, W, V],
      [W, F, SDL, V, F, W, W],
      [W, V, V, SU1, F, F, W],
      [W, W, B0, F, B0, F, W],
      [W, F, F, F, F, F, W],
      [W, DRU, F, F, DLD, F, W],
      [W, F, F, P, F, F, W],
      [W, W, W, W, W, W, W]
    ]*/
  ]

  static levelTilemap = [
    './sprites/test.json',
    './sprites/level2.json',
    './sprites/level3.json'
  ]

  constructor() {
    super('Game');
    this.totalLevels = 2;
    this.squarePixels = 100;
    this.levelHeight = 10;
    this.levelWidth = 7;
    this.numLevel = 0;
  }

  init(input) {
    this.power = input.power;
    this.numLevel = input.level;
    this.level = Game.levels[this.numLevel];
    //this.numLevel++;
    //this.scene.start('game', {power: 3, mapNumber: this.levelTurn + 1})
  }

  preload() {
    this.load.spritesheet('player', './sprites/player_end.png', { frameWidth: 94, frameHeight: 100 });
    this.load.spritesheet('charger', './sprites/charger_end.png', { frameWidth: 94, frameHeight: 100 });
    this.load.spritesheet('square', './sprites/square_end.png', { frameWidth: 122, frameHeight: 114 });
    this.load.spritesheet('shooter', './sprites/shooter_end.png', { frameWidth: 52, frameHeight: 72 });
    this.load.spritesheet('zigzag', './sprites/zigzag_end.png', { frameWidth: 94, frameHeight: 100 });
    this.load.spritesheet('bullet', './sprites/bullet_end.png', { frameWidth: 120, frameHeight: 128 });
    this.load.image('block_act', './sprites/block_act_end.png');
    this.load.image('block_deact', './sprites/block_deact_end.png');
    this.load.tilemapTiledJSON('tileMapPhaser', Game.levelTilemap[this.numLevel]);
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
    this.enemies = [];


    const background_config = {
      mute: false,
      volume: 0.35,
      mod: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };

    const movementSound_config = {
      volume: 0.25,
      mod: 1,
      detune: 0,
      seek: 0,
    }

    const timeStopSound_config = {
      loop: true,
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

    this.copyLevel = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];

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
  }

  Turn(dir) {
    if (!this.playerDead && this.time > 150) {
      if (this.player.Move(dir) && (this.player.power != 'timeStop' || !this.player.powerUsed)) {
        for (let i = 0; i < this.enemies.length; i++)
          if (!this.enemies[i].frozen) this.enemies[i].Act();

        this.timeStopSound.stop();
      }
      this.player.powerUsed = false;
      this.time = 0;
    }
    if (!this.levelFolded)
      this.Copy(this.level, this.copyLevel);

    this.checkDeath();
    this.checkVictory();
  }

  UsePower() {
    if (!this.playerDead && this.time > 150)
      this.player.UsePower();
  }

  levelLoad() {
    let px, py;
    let fil = this.level.length;
    let col = this.level[0].length;

    const CreateEnemy = (tipo, i, j) => { this.enemies.push(new tipo(this.level, this, j, i, this.squarePixels, this.squarePixels, this.level[i][j].type, this.level[i][j].facing, this.level[i][j].mod)); }
    const CreateBlock = (i, j) => {
      let sprite = 'block_deact';
      if (this.level[i][j].facing > 0) sprite = 'block_act';
      this.blocks.push(new block(this, j, i, this.squarePixels, this.squarePixels, sprite, this.level[i][j].facing, this.level[i][j].mod));
    }

    for (let i = 0; i < fil; i++) {
      for (let j = 0; j < col; j++) {
        switch (this.level[i][j].type) {
          case 'player':
            px = j;
            py = i;
            this.level[i][j] = { type: 'floor' };
            break;

          default:
            if (this.level[i][j].type === 'shooter' || this.level[i][j].type === 'charger' || this.level[i][j].type === 'zigzag' || this.level[i][j].type === 'square') 
              CreateEnemy(this.level[i][j].constructor, i, j);
            else if (this.level[i][j].type === 'block')
              CreateBlock(i, j);
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
      if (entity.type != 'floor' && entity.type != 'finish')
      {
        this.player.KillText(this.startingX, this.startingY);
        this.playerDead = true;
        this.tweens.add({
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
      {
        //this.scene.restart();
        this.scene.start('Game', {power: this.power, level: this.numLevel });
      }
  }

  checkVictory() {
    let entity = this.level[this.player.posY][this.player.posX];
    if (entity.type == 'finish') {
      this.end_iniSound.play();
      this.end_finSound.play();
      if (this.numLevel < (this.totalLevels - 1)) //El primer nivel es el 0 y se incrementa al cambiar -> -1
        this.scene.start('Game', {power: this.power, level: (this.numLevel + 1) });
      else
        this.scene.start('End');
      this.backgroundMusic.stop();
    }
  }



  //Métodos relacionados con el mapa y su modificación
  BlockCollision(x, y) {
    let found = false;
    for (let i = 0; i < this.blocks.length && !found; i++) {
      if (this.blocks[i].posX == x)
        if (this.blocks[i].posY == y) {
          this.blocks[i].ChangeState();
          this.CheckBlocks(this.blocks[i].link);
          found = true;
        }
    }
  }

  CheckBlocks(link) {
    let block1 = -1;
    let block2 = -1;
    let cont = 0;
    for (let i = 0; i < this.blocks.length && cont < 2; i++) {
      if (this.blocks[i].link == link) {
        if (block1 < 0) block1 = i;
        else block2 = i;

        if (this.blocks[i].active) cont++;
      }
    }

    if (cont >= 2) {
      this.blocks[block1].folding = true;
      this.blocks[block2].folding = true;

      if (this.blocks[block1].posX == this.blocks[block2].posX) {
        let pos1 = this.blocks[block1].posY;
        let pos2 = this.blocks[block2].posY;
        this.blocks[block1].CorrectPosition((pos2 - pos1 - 1), 'vertical', true);
        this.FoldLevel(pos1, pos2, 'vertical');
      }
      else {
        let pos1 = this.blocks[block1].posX;
        let pos2 = this.blocks[block2].posX;
        this.blocks[block1].CorrectPosition((pos2 - pos1 - 1), 'horizontal', true);
        this.FoldLevel(pos1, pos2, 'horizontal');
      }
    }
    else if (cont === 1) // poner 3 iguales siempre que se pueda
    {
      if (this.blocks[block1].folding) {
        this.blocks[block1].folding = false;
        this.blocks[block2].folding = false;

        if (this.blocks[block1].posX == this.blocks[block2].posX) {
          let pos1 = this.blocks[block1].oriY;
          let pos2 = this.blocks[block2].oriY;
          this.blocks[block1].CorrectPosition(pos2 - pos1 - 1, 'vertical', false);
          this.UnfoldLevel(pos1, pos2, 'vertical');
          this.UpdateEntitiesUnfold(pos1, pos2, 'vertical');
        }
        else {
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

  FoldLevel(pos1, pos2, dir) {
    this.levelFolded = true;
    this.block_onSound.play();
    let tile;
    if (dir == 'horizontal') // 3 iguales
    {
      this.EraseTiles(pos1 + 1, (pos2 - pos1 - 1), 0, this.levelHeight);

      for (let i = pos2 - (pos2 - pos1); i >= 0; i--)
        for (let j = 0; j < this.levelHeight; j++) {
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
    else {
      this.EraseTiles(0, this.levelWidth, pos1 + 1, (pos2 - pos1 - 1));

      // ESTO SON NUMEROS MAGICOS !!!!
      for (let i = 6; i >= 0; i--) //Los bucles son inversos para que no se sobreescriban los tiles
        for (let j = pos2 - 3; j >= 0; j--) {
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

  UnfoldLevel(pos1, pos2, dir) {
    this.levelFolded = false;
    let tile;
    this.block_offSound.play();
    if (dir == 'horizontal') {
      for (let i = 0; i < pos2 - (pos2 - pos1 - 1); i++)
        for (let j = 0; j < this.levelHeight; j++) {
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
    else {
      for (let i = 0; i < this.levelWidth; i++)
        for (let j = 0; j < pos2 - 2; j++) {
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

  EraseTiles(x, height, y, width) {
    this.erasedTiles = []
    let cont = 0;
    for (let i = x; i < height + x; i++)
      for (let j = y; j < width + y; j++) {
        this.erasedTiles[cont] = this.backgroundLayer.getTileAt(i, j); cont++;
        this.backgroundLayer.removeTileAt(i, j);
        this.erasedTiles[cont] = this.foreground.getTileAt(i, j); cont++;
        this.foreground.removeTileAt(i, j);
        this.erasedTiles[cont] = this.groundLayer.getTileAt(i, j); cont++;
        this.groundLayer.removeTileAt(i, j);
      }
  }

  RecoverTiles(x, height, y, width) {
    let cont = 0;
    for (let i = x; i < height + x; i++)
      for (let j = y; j < width + y; j++) {
        this.backgroundLayer.putTileAt(this.erasedTiles[cont], i, j); cont++;
        this.foreground.putTileAt(this.erasedTiles[cont], i, j); cont++;
        this.groundLayer.putTileAt(this.erasedTiles[cont], i, j); cont++;
      }
  }

  UpdateEntitiesFold(pos1, pos2, dir) {
    let dist = pos2 - pos1 - 1;
    if (dir == 'horizontal') {
      if (this.player.posX <= pos1 && this.player.posX < pos2)
        this.player.CorrectPosition(dist, dir);
      else if (this.player.posX < pos2) {
        this.player.Displace(dir);
        if (this.player.posX < pos2 - 1)
          this.player.CorrectPosition(pos2 - pos1 - 2, dir);
      }

      // for (let i = 0; i < this.enemies.length; i++)
      for (const enemy of this.enemies) // let i = 0; i < this.enemies.length; i++)
      {
        if (enemy.posX > pos1 && enemy.posX < pos2)
          enemy.Freeze(false);
        else if (enemy.posX <= pos1)
          enemy.CorrectPosition(dist, dir);
      }
    }
    else {
      if (this.player.posY <= pos1 && this.player.posY < pos2)
        this.player.CorrectPosition(dist, dir);
      else if (this.player.posY < pos2) {
        this.player.Displace(dir);
        if (this.player.posY < pos2 - 1)
          this.player.CorrectPosition(pos2 - pos1 - 2, dir);
      }

      // for (let i = 1; i <= this.enemies[0]; i++) {
      for (const enemy of this.enemies) {

        if (enemy.posY > pos1 && enemy.posY < pos2)
          enemy.Freeze(false);
        else if (enemy.posY <= pos1)
          enemy.CorrectPosition(dist, dir);
      }
    }
  }

  UpdateEntitiesUnfold(pos1, pos2, dir) {
    let dist = pos2 - pos1 - 1;
    if (dir == 'horizontal') {
      if (this.player.posX <= (pos1 + dist) && this.player.posX < pos2)
        this.player.CorrectPosition(-dist, dir);
      else if (this.player.posX < pos2) {
        this.player.Displace(dir);
        if (this.player.posX < pos2 - 1)
          this.player.CorrectPosition(pos2 - pos1 - 2, dir);
      }

      for (let i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i].posX == (pos1 + dist) && this.enemies[i].frozen)
          this.enemies[i].Freeze(true);
        else if (this.enemies[i].posX <= (pos1 + dist))
          this.enemies[i].CorrectPosition(-dist, dir);
      }
    }
    else {
      if (this.player.posY <= (pos1 + dist) && this.player.posY < pos2)
        this.player.CorrectPosition(-dist, dir);
      else if (this.player.posY < pos2) {
        this.player.Displace(dir);
        if (this.player.posY < pos2 - 1)
          this.player.CorrectPosition(pos2 - pos1 - 2, dir);
      }

      for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].posY == (pos1 + dist) && this.enemies[i].frozen)
          this.enemies[i].Freeze(true);
        else if (this.enemies[i].posY <= (pos1 + dist))
          this.enemies[i].CorrectPosition(-dist, dir);
      }
    }
  }

  Copy(from, to) {
    for (let i = 0; i < this.levelHeight; i++)
      for (let j = 0; j < this.levelWidth; j++)
        to[i][j] = from[i][j];
  }

  RestoreLevel(pos1, pos2, dir) {
    if (dir == 'horizontal') {
      for (let i = 0; i < this.levelHeight; i++)
        for (let j = 0; j < this.levelWidth; j++)
          if (j > pos1 && j < pos2)
            this.level[i][j] = this.copyLevel[i][j];
    }
    else {
      for (let i = 0; i < this.levelHeight; i++)
        for (let j = 0; j < this.levelWidth; j++)
          if (i > pos1 && i < pos2)
            this.level[i][j] = this.copyLevel[i][j];
    }
  }
}