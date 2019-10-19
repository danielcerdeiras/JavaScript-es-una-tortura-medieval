export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height)
    {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.displayWidth = width;
        this.displayHeight = height;
    }
}