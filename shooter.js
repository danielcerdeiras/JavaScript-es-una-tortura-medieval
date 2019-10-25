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
        if (this.cont >= this.fireRate)
        {
            this.bullets[ind] = new bullet(this.scene, 50, 50, 50, 50, this.bulletSprite, 6);
            this.ind++;
            this.cont = 0;
        }
        
        else
            this.cont = this.cont + 1;

        for (let i = 0; i < this.ind; i++)
            this.bullets[i].Act();
    }
}