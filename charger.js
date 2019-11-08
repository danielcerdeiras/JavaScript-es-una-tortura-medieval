import enemy from './enemy.js';

export default class Charger extends enemy
{
    constructor(level,scene, x, y, width, height, sprite, dir, speed)
    {
        super(scene, x, y, width, height, sprite, level);
        this.dir = dir;
        this.speed = speed;
    }

    Act()
    {
        switch(this.dir)
        {
            case 1:
                this.posX -= this.speed;
                this.posY += this.speed;
                break;

            case 2:
                if(this.level[this.posY+1] [this.posX]  != 2){
                    this.level[this.posY + 1 ][this.posX] = this.level[this.posY][this.posX];
                    this.level[this.posY ][this.posX] = 1;
                    this.posY += this.speed;
                }
                else (this.dir =8)//this.ChangeDir())
                break;
                
            case 3:
                this.posX += this.speed;
                this.posY += this.speed;
                break;

            case 4:
                this.posX -= this.speed;
                break;

            case 6:
                this.posX += this.speed;
                break;

            case 7:
                this.posX -= this.speed;
                this.posY -= this.speed;
                break;
                    
            case 8:
                if(this.level[this.posY-1] [this.posX]  != 2){    
                    this.level[this.posY -1 ][this.posX] = this.level[this.posY][this.posX];
                    this.level[this.posY][this.posX] = 1;
                    this.posY -= this.speed;}
                else (this.dir = 2)
                break;
    
            case 9:
                this.posX += this.speed;
                this.posY -= this.speed;
                break;
        }

        this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);
    }

    ChangeDir()
    {
        this.dir -= 10;
    }
}