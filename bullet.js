import enemy from './enemy.js';

export default class Bullet extends enemy
{
    constructor(level,scene, x, y, width, height, sprite, dir)
    {
        super(scene, x, y, width, height, sprite, level);
        this.displayWidth = width / 4;
        this.displayHeight = height / 4;
        this.dir = dir;
        this.tween;
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
        
        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * (this.displayWidth * 4)) + (this.displayWidth * 2),
            y: (this.posY * (this.displayHeight * 4)) + (this.displayWidth * 2),
            ease: 'Power1',
            duration: 200,
        });

        return !(this.posX > 7 || this.posX < 0 || this.posY < 0 ||this.posY > 10)
    }
}