export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, sprite)
    {
        super(scene, (x * width + width / 2), (y * height + height / 2), sprite);
        this.scene.add.existing(this);
        this.posX = x;
        this.posY = y;
        this.displayWidth = width;
        this.displayHeight = height;
    }

    Move(dir, level)
    {
        switch(dir)
        {
            case 2:
                if(level[this.posY +1 ][this.posX] == 1){
                    level[this.posY ][this.posX]= 1;
                    level[this.posY +1 ][this.posX] = 3;
                this.posY++; }
                break;
                
            case 4:
                    if(level[this.posY][this.posX-1] == 1){
                        level[this.posY ][this.posX]= 1;
                        level[this.posY][this.posX-1] = 3;
                        this.posX--;
                    }
                break;

            case 6:
                    if(level[this.posY ][this.posX +1] == 1){
                        level[this.posY ][this.posX]= 1;
                        level[this.posY ][this.posX +1]= 3;
                        this.posX++;

                    }
                break;

            case 8:
                    if(level[this.posY -1 ][this.posX] == 1){
                        level[this.posY ][this.posX]= 1;
                        level[this.posY -1 ][this.posX] = 3;
                        this.posY--;
                    }
                break;
        }

        this.x = (this.posX * this.displayWidth) + (this.displayWidth / 2);
        this.y = (this.posY * this.displayHeight) + (this.displayHeight / 2);
    }
}