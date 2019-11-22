import enemy from './enemy.js';

export default class Bullet extends enemy
{
    constructor(level,scene, x, y, width, height, sprite, dir)
    {
        super(scene, x, y, width, height, sprite, level);
        this.dir = dir;
    }

    Act()
    {
        switch(this.dir)
        {
            case 1:
                this.posX--;
                this.posY++;
                break;

            case 2:
                if(this.level[this.posY+1] [this.posX]  != 2)
                this.posY++;
                else return false;
                break;
                
            case 3:
                this.posX++;
                this.posY++;
                break;

            case 4:
                if(this.level[this.posY] [this.posX-1]  != 2)
                this.posX--;
                else return false;
                break;

            case 6:
                if(this.level[this.posY] [this.posX+1]  != 2)
                this.posX++;
                else return false;
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
        
        var tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * (this.displayWidth * 2)) + (this.displayWidth),
            y: (this.posY * (this.displayHeight * 2)) + (this.displayHeight),
            ease: 'Power1',
            duration: 200,
        });

        return !(this.posX > 7 || this.posX < 0 || this.posY < 0 ||this.posY > 10)
    }
}