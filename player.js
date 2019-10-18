export default class player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, width, height) {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.body.SetColliderWorldBounds();
        this.displayWidth = width;
        this.displayHeight = height;
    }
}