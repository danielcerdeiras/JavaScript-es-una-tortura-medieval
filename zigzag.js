import enemy from './enemy.js';

export default class Zigzag extends enemy
{
    constructor(scene, x, y, width, height, sprite, dir1, dir2)
    {
        super(scene, x, y, width, height, sprite);
        this.dir_1 = dir1;
        this.dir_2 = dir2;
        this.cont = 0;
    }

    Act()
    {
        let sign = -1;
        if (this.cont % 3 == 0) sign = 1;

        switch(this.dir_1)
        {
            case 2:
                this.posY++;
                break;
                
            case 4:
                this.posX--;
                break;

            case 6:
                this.posX++;
                break;
                    
            case 8:
                this.posY--;
                break;
        }

        switch(this.dir_2)
        {
            case 2:
                this.posY += sign;
                break;
                
            case 4:
                this.posX -= sign;
                break;

            case 6:
                this.posX += sign;
                break;
                    
            case 8:
                this.posY -= sign;
                break;
        }

        this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);

        this.cont++;
        if (this.cont > 3) this.cont = 0;
    }
}