export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, width, height) {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.body.SetColliderWorldBounds();
        this.displayWidth = width;
        this.displayHeight = height;
        this.SetOrigin(0, 0);
        this.cursors = scene.cursors.input.keyboard.addKeys('W,A,S,D');
    }

    move() {
        if (this.cursors.W.isDown)
            this.y -= 10;
        if (this.cursors.S.isDown)
            this.y += 10;
        if (this.cursors.A.isDown)
            this.x -= 10;
        if (this.cursors.D.isDown)
            this.x += 10;
    }
}