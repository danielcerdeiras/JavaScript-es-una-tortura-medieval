export default class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, sprite)
    {
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.displayWidth = width;
        this.displayHeight = height;
    }
}