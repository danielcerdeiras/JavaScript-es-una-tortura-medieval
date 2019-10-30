import enemy from './enemy.js';
import bullet from './bullet.js';

export default class Shooter extends enemy
{
    constructor(scene, x, y, width, height, sprite, bulletSprite, dir, fireRate)
    {
        super(scene, x, y, width, height, sprite);
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
                        this.bullets[j] = new bullet(this.scene, this.posX, this.posY, this.displayWidth / 2, this.displayHeight / 2, this.bulletSprite, i);
                        found = true;
                    }
                }
    
                if (!found && i !== 5)
                {
                    this.ind++;
                    this.bullets[this.ind] = new bullet(this.scene, this.posX, this.posY, this.displayWidth / 2, this.displayHeight / 2, this.bulletSprite, i);
                }
                i++;
            }

            if (this.dir !== 5) //La versión sin 5 del disparo es la siguiente sin todo lo anterior quitando el if inicial
            {
                let found = false;
                for (let j = 0; j <= this.ind && !found; j++)
                {
                    if (this.bullets[j] == null)
                    {
                        this.bullets[j] = new bullet(this.scene, this.posX, this.posY, this.displayWidth / 2, this.displayHeight / 2, this.bulletSprite, this.dir);
                        found = true;
                    }
                }
    
                if (!found)
                {
                    this.ind++;
                    this.bullets[this.ind] = new bullet(this.scene, this.posX, this.posY, this.displayWidth / 2, this.displayHeight / 2, this.bulletSprite, this.dir);
                }
            }
            this.time = 0;
        }

        for (let i = 0; i <= this.ind; i++)
            if (this.bullets[i] != null && !this.bullets[i].Act())
            {
                delete(this.bullets[i]); //No terminan de destruirse pero ha sido un buen intento
                this.bullets[i] = null;
            }

        this.time++;
    }
}