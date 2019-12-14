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
                        this.bullets[j] = new bullet(this.level,this.scene, this, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, i, j);
                        found = true;
                    }
                }
    
                if (!found && i !== 5)
                {
                    this.ind++;
                    this.bullets[this.ind] = new bullet(this.level,this.scene, this, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, i, this.ind);
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
                        this.bullets[j] = new bullet(this.level,this.scene, this, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, this.dir, j);
                        found = true;
                    }
                }
    
                if (!found)
                {
                    this.ind++;
                    this.bullets[this.ind] = new bullet(this.level,this.scene, this, this.posX, this.posY, this.displayWidth, this.displayHeight, this.bulletSprite, this.dir, this.ind);
                }
            }
            this.time = 0;
        }

        for (let i = 0; i <= this.ind; i++)
            this.bullets[i].Act()

        this.time++;
    }

    CorrectPosition(squares, dir)
    {
        if (dir == 'horizontal')
        {
            this.posX += squares;
            this.scene.tweens.add({
                targets: this,
                x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
                y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
                ease: 'Power1',
                duration: 200,
            });
        }
        else
        {
            this.posY += squares;
            this.scene.tweens.add({
                targets: this,
                x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
                y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
                ease: 'Power1',
                duration: 200,
            });
        }

        for (let i = 0; i <= this.ind; i++)
            this.bullets[i].CorrectPosition(squares, dir);
    }

    KillBullet(dead, ind)
    {
        if (dead)
            this.bullets[ind].destroy();
    }
}