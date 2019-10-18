export default class Enemy extends Phaser.GameObjects.Sprites
{
    constructor(scene, x, y, dir)
    {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.body.SetColliderWorldBounds();
        this.displayWidth = width;
        this.displayHeight = height;
    }

    Shoot(dir)
    {

    }

    Move(dir)
    {
        switch(dir)
        {
            case 1:
                this.x--;
                this.y--;
                break;

                case 2:
        }
    }
}