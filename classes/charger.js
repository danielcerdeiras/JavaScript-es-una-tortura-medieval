import Enemy from './enemy.js';

export default class Charger extends Enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir, speed)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir = dir;
        this.speed = speed;
        this.tween;
        this.square = level[y][x]; //Guarda el valor de la casilla que ocupa la bala en la matriz para restaurarlo cuando se mueva

        this.scene.anims.create({
            key:'right_charger',
            frames: this.scene.anims.generateFrameNumbers('charger',{ start: 6, end: 8 }),
            frameRate:3,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'left_charger',
            frames: this.scene.anims.generateFrameNumbers('charger',{ start: 3, end: 5 }),
            frameRate:3,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'up_charger',
            frames: this.scene.anims.generateFrameNumbers('charger',{ start: 9, end: 11 }),
            frameRate:3,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'down_charger',
            frames: this.scene.anims.generateFrameNumbers('charger',{ start: 0, end: 2 }),
            frameRate:3,
            repeat:-1,
        });

        this.play('down_charger');
    }

    Act()
    {   
        switch(this.dir)
        {

            case 'down':
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 0, 1); i++)
                    this.posY++;
                    this.play('down_charger')
                break;

            case 'left':
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, -1, 0); i++)
                    this.posX--;
                    this.play('left_charger')
                break;

            case 'right':
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 1, 0); i++)
                    this.posX++;
                    this.play('right_charger')
                break;

            case 'up':
                for (let i = 0; i < this.speed && this.Attempt(this.posX, this.posY, 0, -1); i++)
                    this.posY--;
                    this.play('up_charger')
                break;
        }

        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });
    }

    Attempt(x, y, xInc, yInc)
    {
        if (this.level[y + yInc][x + xInc] != 2 && this.level[y + yInc][x + xInc] != 0)
        {
            
            this.level[y + yInc][x + xInc] = this.level[y][x];
            this.level[y][x] = 1;
            return (true);
        }
        else
        {
            this.dir = 10 - this.dir; //Dirección opuesta
            return (false);
        }
    }
}