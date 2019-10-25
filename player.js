export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, sprite)
    {
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.displayWidth = width;
        this.displayHeight = height;
    }

    Move(dir)
    {
        switch(dir)
        {
            case 2:
                this.y = this.y + 1;
                break;
                
            case 4:
                this.x = this.x - 1;
                break;

            case 6:
                this.x = this.x + 1;
                break;

            case 8:
                this.y = this.y - 1;
                break;
        }
    }
}