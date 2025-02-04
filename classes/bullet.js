import Enemy from './enemy.js';

export default class Bullet extends Enemy
{
    constructor(level, scene, shooter, x, y, width, height, sprite, dir, ind)
    {
        super(level, scene, x, y, width, height, sprite);
        this.displayWidth = width;
        this.displayHeight = height;
        this.square = level[y][x]; //Guarda el valor de la casilla que ocupa la bala en la matriz para restaurarlo cuando se mueva
        this.dir = dir;
        this.tween;
        this.shooter = shooter;
        this.ind = ind;
        this.dead = false;

        
        this.scene.anims.create({
            key:'left_bullet',
            frames: this.scene.anims.generateFrameNumbers('bullet',{ start: 63, end: 65 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'down_bullet',
            frames: this.scene.anims.generateFrameNumbers('bullet',{ start: 51, end: 53 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'right_bullet',
            frames: this.scene.anims.generateFrameNumbers('bullet',{ start: 75, end: 77 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'up_bullet',
            frames: this.scene.anims.generateFrameNumbers('bullet',{ start: 87, end: 89 }),
            frameRate:15,
            repeat:-1,
        });
    }

    Act()
    {   if(!this.dead)
        {
            this.level[this.posY][this.posX] = this.square; //Restaura el valor de la casilla actual
        switch(this.dir)
        {
            case 1:
                this.posX--;
                this.posY++;
                this.play('left_bullet');
                break;

            case 2:
                this.posY++;
                this.play('down_bullet');
                break;
                
            case 3:
                this.posX++;
                this.posY++;
                this.play('right_bullet');
                break;

            case 4:
                this.posX--;
                this.play('left_bullet');
                break;

            case 6:
                this.posX++;
                this.play('right_bullet');
                break;

            case 7:
                this.posX--;
                this.posY--;
                this.play('left_bullet');
                break;
                    
            case 8:
                this.posY--;
                this.play('up_bullet');
                break;
    
            case 9:
                this.posX++;
                this.posY--;
                this.play('right_bullet');
                break;
        }
        
        this.dead = (this.level[this.posY][this.posX] > 1)

        this.tween = this.scene.tweens.add({
            targets: this,
            onComplete: this.KillThis.bind(this),
            x: (this.posX * (this.displayWidth)) + (this.displayWidth / 2),
            y: (this.posY * (this.displayHeight)) + (this.displayWidth / 4),
            ease: 'Power1',
            duration: 200,
        });

        this.square = this.level[this.posY][this.posX]; //Guarda el valor de la nueva casilla
        if (!this.dead) this.level[this.posY][this.posX] = -1; //Valor que se reconozca como enemigo
    }
    }

    CorrectPosition(squares, dir) //Corrige la posición de las balas al plegarse el nivel
    {
        if (!this.dead)
        {
            if (dir == 'horizontal')
                this.posX += squares;
            else
                this.posY += squares;
        }
    }

    KillThis()
    {
        this.shooter.KillBullet(this.dead, this.ind);
    }
}