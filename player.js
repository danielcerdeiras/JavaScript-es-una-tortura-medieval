export default class player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, width, height) {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.body.SetColliderWorldBounds();
        this.displayWidth = width;
        this.displayHeight = height;
        this.cursors = scene.cursors.input.keyboard.createCursorKeys();
    }

    move() {
        if (this.cursors.up.isDown)
            this.y -= 10;
        if (this.cursors.down.isDown)
            this.y += 10;
        if (this.cursors.left.isDown)
            this.x -= 10;
        if (this.cursors.rigth.isDown)
            this.x += 10;
    }
}