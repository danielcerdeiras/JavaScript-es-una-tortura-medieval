export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(level, scene, x, y, width, height, sprite, power)
    {
        super(scene, (x * width + width / 2), (y * height + height / 2), sprite);
        this.scene.add.existing(this);
        this.posX = x;
        this.posY = y;
        this.displayWidth = width;
        this.displayHeight = height;
        this.level = level
        this.power = power;
        this.powerUsed = false;
        this.speed = 1;
        this.tween;
        
        switch (power)
        {
            case 'timeStop':
                this.cooldown = 10;
                break;

            case 'flash':
                this.cooldown = 6;
                break;
        }

        this.time = this.cooldown;
    }

    Move(dir)
    {
        let moved = true;
        this.speed = 1;
        if(this.power == 'flash' && this.powerUsed)
        this.speed = 2;

        let value;
        switch(dir)
        {
            case 2:
                value = this.level[this.posY + this.speed][this.posX];
                if(value != 2 && Math.trunc(value / 100) != 5)
                    this.posY += this.speed;
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX, this.posY + this.speed);
                    moved = false;
                }
                else moved = false;
                break;
                
            case 4:
                value = this.level[this.posY][this.posX - this.speed];
                if(value != 2 && Math.trunc(value / 100) != 5)
                    this.posX -= this.speed;
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX - this.speed, this.posY);
                    moved = false;
                }
                else moved = false;
                break;

            case 6:
                value = this.level[this.posY][this.posX + this.speed];
                if(value != 2 && Math.trunc(value / 100) != 5)
                    this.posX += this.speed;
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX + this.speed, this.posY);
                    moved = false;
                }
                else moved = false;
                break;

            case 8:
                value = this.level[this.posY - this.speed][this.posX];
                if(value != 2 && Math.trunc(value / 100) != 5)
                    this.posY -= this.speed;
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX, this.posY - this.speed);
                    moved = false;
                }
                else moved = false;
                break;
        }

        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        if (!this.powerUsed && moved)
            this.time++;

        return (moved);
    }

    UsePower()
    {
        if (this.time >= this.cooldown)
        {
            this.powerUsed = true;
            this.time = 0;
        }
    }

    LevelChanged(level)
    {
        this.level  = level;
    }

    CorrectPosition(squares, dir)
    {
        if (dir == 'horizontal')
            this.posX += squares;
        else
            this.posY += squares;
    }

    Displace(dir)
    {
        if (dir == 'horizontal')
        {
            if (this.level[this.posY + 1][this.posX] != 2)
                this.posY++
            else
                this.posY--;
        }
        else
        {
            if (this.level[this.posY][this.posX + 1] != 2)
                this.posX++
            else
                this.posX--; 
        }
    }
}