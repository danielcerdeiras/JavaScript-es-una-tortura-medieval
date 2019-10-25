import enemy from './enemy.js';

export default class Charger extends enemy
{
    constructor(scene, x, y, width, height, sprite, dir, speed)
    {
        super(scene, x, y, width, height, sprite);
        this.dir = dir;
        this.speed = speed;
    }

    Act()
    {
        switch(this.dir)
        {
            case 1:
                this.x = this.x - this.speed;
                this.y = this.y + this.speed;
                break;

            case 2:
                this.y = this.y + this.speed;
                break;
                
            case 3:
                this.x = this.x + this.speed;
                this.y = this.y + this.speed;
                break;

            case 4:
                this.x = this.x - this.speed;
                break;

            case 6:
                this.x = this.x + this.speed;
                break;

            case 7:
                this.x = this.x - this.speed;
                this.y = this.y - this.speed;
                break;
                    
            case 8:
                this.y = this.y - this.speed;
                break;
    
            case 9:
                this.x = this.x + this.speed;
                this.y = this.y - this.speed;
                break;
        }
    }

    ChangeDir()
    {
        this.dir = 10 - this.dir;
    }
}