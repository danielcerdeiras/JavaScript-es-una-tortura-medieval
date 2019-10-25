export default class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height)
    {
        super(scene, x, y, 'basicEnemy');
        this.scene.add.existing(this);
        this.displayWidth = width;
        this.displayHeight = height;
    } 
}