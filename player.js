export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height)
    {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.displayWidth = width;
        this.displayHeight = height;
    }

    Move(dir)
    {
        switch(dir)
        {
            case 2:
                this.y++;
                break;
                
            case 4:
                this.x--;
                break;

            case 6:
                this.x++;
                break;

            case 8:
                this.y--;
                break;
        }
    }
}