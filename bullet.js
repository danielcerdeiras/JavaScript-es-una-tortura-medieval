import enemy from './enemy.js';

export default class Bullet extends enemy
{
    constructor(scene, x, y, width, height, sprite, dir)
    {
        super(scene, x, y, width, height, sprite);
        this.dir = dir;
    }

    Act()
    {
        switch(this.dir)
        {
            case 1:
                this.x = this.x - 1;
                this.y = this.y + 1;
                break;

            case 2:
                this.y = this.y + 1;
                break;
                
            case 3:
                this.x = this.x + 1;
                this.y = this.y + 1;
                break;

            case 4:
                this.x = this.x - 1;
                break;

            case 6:
                this.x = this.x + 1;
                break;

            case 7:
                this.x = this.x - 1;
                this.y = this.y - 1;
                break;
                    
            case 8:
                this.y = this.y - 1;
                break;
    
            case 9:
                this.x = this.x + 1;
                this.y = this.y - 1;
                break;
        }
    }
}