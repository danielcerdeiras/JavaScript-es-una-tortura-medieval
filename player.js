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
        let speed = 1;
        if(this.power == 'flash' && this.powerUsed)
        speed = 2;

        switch(dir)
        {
            case 2:
                if(level[this.posY + speed ][this.posX] != 2){
                this.posY += speed; }
                break;
                
            case 4:
                    if(level[this.posY][this.posX-speed] != 2){
                        this.posX -= speed;
                    }
                break;

            case 6:
                    if(level[this.posY ][this.posX +speed] != 2){
                        this.posX += speed;
                    }
                break;

            case 8:
                    if(level[this.posY -speed ][this.posX] != 2){
                        this.posY -= speed;
                    }
                break;
        }

        this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);

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