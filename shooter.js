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

    Update()
    {
        this.time = this.time + 1;
    }

    Act()
    {
        if (this.time >= this.fireRate)
        {
            let found = false;
            for (let i = 0; i <= this.ind && !found; i++)
            {
                if (this.bullets[i] == null)
                {
                    this.bullets[i] = new bullet(this.scene, this.x, this.y, this.displayWidth / 2, this.displayHeight / 2, this.bulletSprite, 6, this.ind);
                    found = true;
                }
            }

            if (!found)
            {
                this.ind = this.ind + 1;
                this.bullets[this.ind] = new bullet(this.scene, this.x, this.y, this.displayWidth / 2, this.displayHeight / 2, this.bulletSprite, 6, this.ind);
            }
            this.time = 0;
        }

        for (let i = 0; i <= this.ind; i++)
            if (this.bullets[i] != null && !this.bullets[i].Act())
            {
                delete(this.bullets[i]); //No terminan de destruirse pero ha sido un buen intento
                this.bullets[i] = null;
            }
    }

    /*Act()
    {
        if (this.time >= this.fireRate)
        {
            this.bullets[ind] = new bullet(this.scene, 50, 50, 50, 50, this.bulletSprite, 6);
            this.ind++;
            this.time = 0;
        }
        
        else
            this.time = this.time + 1;

        for (let i = 0; i < this.ind; i++)
            this.bullets[i].Act();
    }*/
}