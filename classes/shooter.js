import Enemy from './enemy.js';
import bullet from './bullet.js';

export default class Shooter extends Enemy
{
    constructor(level,scene, x, y, width, height, sprite, dir, fireRate)
    {
        super(level, scene, x, y, width, height, sprite);
        this.bulletSprite = 'bullet';
        this.dir = dir;
        this.fireRate = fireRate;
        this.time = fireRate;
        this.ind = 0;
        this.bullets = [];

        this.scene.anims.create({
            key:'standing_right_shooter',
            frames: this.scene.anims.generateFrameNumbers('shooter',{ start: 28, end: 29 }),
            frameRate:3,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'standing_left_shooter',
            frames: this.scene.anims.generateFrameNumbers('shooter',{ start: 16, end: 17 }),
            frameRate:3,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'standing_up_shooter',
            frames: this.scene.anims.generateFrameNumbers('shooter',{ start: 40, end: 41 }),
            frameRate:3,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'standing_down_shooter',
            frames: this.scene.anims.generateFrameNumbers('shooter',{ start: 4, end: 5 }),
            frameRate:3,
            repeat:-1,
        });



        switch(this.dir){
            case 'down':
                this.play('standing_down_shooter');
                break;
            case 'left':
                this.play('standing_left_shooter');
                break;
            case 'right':
                this.play('standing_right_shooter');
                break;
            case 'up':
                this.play('standing_up_shooter');
                break;
        }
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