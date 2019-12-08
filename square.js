import enemy from './enemy.js';

export default class Square extends enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir, dir_2)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir = dir;
        this.secDir = dir_2;
        this.cont = 0;
        this.tween;
    }

    Act()
    {
        let label = this.level[this.posY][this.posX];
        this.level[this.posY][this.posX] = 1;
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

        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        this.level[this.posY][this.posX] = label;
        this.cont = this.cont + 1;
        if (this.cont > 3) this.cont = 0;
    }
}