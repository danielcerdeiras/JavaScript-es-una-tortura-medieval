import enemy from './enemy.js';

export default class Square extends enemy
{
    constructor(scene, x, y, width, height, sprite, dir, dir_2)
    {
        super(scene, x, y, width, height, sprite);
        this.dir = dir;
        this.secDir = dir_2;
        this.cont = 0;
    }

    Act()
    {
        switch (this.cont)
        {
            case 0:
                    switch (this.dir)
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
                break;

            case 1:
                    switch (this.secDir)
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
                break;

            case 2:
                    switch (10 - this.dir)
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
                break;
    
            case 3:
                    switch (10 - this.secDir)
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
            break;
        }

        this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);

        this.cont = this.cont + 1;
        if (this.cont > 3) this.cont = 0;
    }
}