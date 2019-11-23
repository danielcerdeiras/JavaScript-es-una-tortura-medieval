export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, sprite, power)
    {
        super(scene, (x * width + width / 2), (y * height + height / 2), sprite);
        this.scene.add.existing(this);
        this.posX = x;
        this.posY = y;
        this.displayWidth = width;
        this.displayHeight = height;
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

    Move(dir, level)
    {
        this.speed = 1;
        if(this.power == 'flash' && this.powerUsed)
        this.speed = 2;

        switch(dir)
        {
            case 2:
                if(level[this.posY + this.speed ][this.posX] != 2){
                this.posY += this.speed; }
                break;
                
            case 4:
                    if(level[this.posY][this.posX-this.speed] != 2){
                        this.posX -= this.speed;
                    }
                break;

            case 6:
                    if(level[this.posY ][this.posX +this.speed] != 2){
                        this.posX += this.speed;
                    }
                break;

            case 8:
                    if(level[this.posY -this.speed ][this.posX] != 2){
                        this.posY -= this.speed;
                    }
                break;
        }

        //this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        //this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);

        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        if (!this.powerUsed)
            this.time++;
        else
            this.powerUsed = false;
    }

    UsePower()
    {
        if (this.time >= this.cooldown)
        {
            this.powerUsed = true;
            this.time = 0;
        }
    }
}