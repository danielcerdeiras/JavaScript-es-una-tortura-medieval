export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, width, height) {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        //this.scene.physics.add.existing(this);
        //this.body.setCollideWorldBounds();
        this.displayWidth = width;
        this.displayHeight = height;
        this.cursors = scene.input.keyboard.addKeys('W,A,S,D');
    }

    move() {
        if (this.cursors.W.isDown)
        {
            this.y = this.y - 10;
        }
        if (this.cursors.S.isDown)
        {
            this.y = this.y + 10;
        }
        if (this.cursors.A.isDown)
        {
            this.x = this.x  - 10;
        }
        if (this.cursors.D.isDown)
        {
            this.x = this.x  + 10;
        }
    }
}