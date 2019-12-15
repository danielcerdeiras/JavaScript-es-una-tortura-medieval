import enemy from './enemy.js';

export default class Bullet extends enemy
{
    constructor(level, scene, shooter, x, y, width, height, sprite, dir, ind)
    {
        super(level, scene, x, y, width, height, sprite);
        this.displayWidth = width / 4;
        this.displayHeight = height / 4;
        this.square = level[y][x]; //Guarda el valor de la casilla que ocupa la bala en la matriz para restaurarlo cuando se mueva
        this.dir = dir;
        this.tween;
        this.shooter = shooter;
        this.ind = ind;
        this.dead = false;
    }

    Act()
    {   if(!this.dead) //Las balas no se destruyen correctamente
        {this.level[this.posY][this.posX] = this.square;
        switch(this.dir)
        {
            case 1:
                this.posX--;
                this.posY++;
                break;

            case 2:
                this.posY++;
                break;
                
            case 3:
                this.posX++;
                this.posY++;
                break;

            case 4:
                this.posX--;
                break;

            case 6:
                this.posX++;
                break;

            case 7:
                this.posX--;
                this.posY--;
                break;
                    
            case 8:
                this.posY--;
                break;
    
            case 9:
                this.posX++;
                this.posY--;
                break;
        }
        
        this.dead = (this.posX > 7 || this.posX < 0 || this.posY < 0 || this.posY > 10 || this.level[this.posY][this.posX] > 1)

        this.tween = this.scene.tweens.add({
            targets: this,
            onComplete: this.KillThis.bind(this),
            x: (this.posX * (this.displayWidth * 4)) + (this.displayWidth * 2),
            y: (this.posY * (this.displayHeight * 4)) + (this.displayWidth * 2),
            ease: 'Power1',
            duration: 200,
        });

        this.square = this.level[this.posY][this.posX];
        if (!this.dead) this.level[this.posY][this.posX] = -1;} //Valor que se reconozca como enemigo
    }

    CorrectPosition(squares, dir)
    {
        this.level[this.posY][this.posX] = this.square;
        if (dir == 'horizontal')
        {
            this.posX += squares;
            /*this.tween = this.scene.tweens.add({
                targets: this,
                onComplete: this.KillThis.bind(this),
                x: (this.posX * (this.displayWidth * 4)) + (this.displayWidth * 2),
                y: (this.posY * (this.displayHeight * 4)) + (this.displayWidth * 2),
                ease: 'Power1',
                duration: 200,
            });*/
        }
        else
        {
            this.posY += squares;
            /*this.tween = this.scene.tweens.add({
                targets: this,
                onComplete: this.KillThis.bind(this),
                x: (this.posX * (this.displayWidth * 4)) + (this.displayWidth * 2),
                y: (this.posY * (this.displayHeight * 4)) + (this.displayWidth * 2),
                ease: 'Power1',
                duration: 200,
            });*/
        }
        this.square = this.level[this.posY][this.posX];
        this.level[this.posY][this.posX] = -1; //Valor que se reconozca como enemigo
    }

    KillThis()
    {
        this.shooter.KillBullet(this.dead, this.ind);
    }
}