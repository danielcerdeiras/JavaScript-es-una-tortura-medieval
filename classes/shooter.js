import enemy from './enemy.js';
import bullet from './bullet.js';

export default class Shooter extends enemy
{
    constructor(level,scene, x, y, width, height, sprite, bulletSprite, dir, fireRate)
    {
        super(level, scene, x, y, width, height, sprite);
        this.bulletSprite = bulletSprite;
        this.dir = dir;
        this.fireRate = fireRate;
        this.time = fireRate;
        this.ind = 0;
        this.bullets = [];
    }

    Act()
    {
        if (this.time >= this.fireRate)
        {
            let i = 1;
            while(this.dir === 5 && i < 10)
            {
                let found = false;
                for (let j = 0; j <= this.ind && !found; j++)
                {
                    if (this.bullets[j] == null && i !== 5)
                    {
                        this.bullets[j] = new bullet(this.level,this.scene, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, i);
                        found = true;
                    }
                }
    
                if (!found && i !== 5)
                {
                    this.ind++;
                    this.bullets[this.ind] = new bullet(this.level,this.scene, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, i);
                }
                i++;
            }

            if (this.dir !== 5)
            {
                let found = false;
                for (let j = 0; j <= this.ind && !found; j++)
                {
                    if (this.bullets[j] == null)
                    {
                        this.bullets[j] = new bullet(this.level,this.scene, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, this.dir);
                        found = true;
                    }
                }
    
                if (!found)
                {
                    this.ind++;
                    this.bullets[this.ind] = new bullet(this.level,this.scene, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, this.dir);
                }
            }
            this.time = 0;
        }

        for (let i = 0; i <= this.ind; i++)
            if (!this.bullets[i].Act())
            {
               // this.scene.time.delayedCall(200, this.bullets[i].destroy);
                this.bullets[i].destroy();
            }

        this.time++;
    }
}