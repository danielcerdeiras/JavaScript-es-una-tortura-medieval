export default class Block extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, width, height, sprite, active, link){
        super(scene, (x * width + width / 2), (y * height + height / 2), sprite);
        this.scene.add.existing(this);
        this.posX = x;
        this.posY = y;
        this.oriX = x;
        this.oriY = y;
        this.displayWidth = width;
        this.displayHeight = height;
        this.link = link;
        this.active = (active != 0);
        this.folding = false;
    }

    ChangeState()
    {
        this.active = !this.active;
    }

    ChangeFolding()
    {
        this.folding = !this.folding;
    }

    CorrectPosition(squares, dir)
    {
        let sign = 1;
        if (this.folding) sign = -1;
        if (dir == 'horizontal')
        {
            //this.posX += squares + (this.oriX - this.posX);
            this.posX += (squares * sign);
            this.scene.tweens.add({
                targets: this,
                x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
                y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
                ease: 'Power1',
                duration: 200,
            });
        }
        else
        {
            //this.posY += squares + (this.oriY - this.posY);
            this.posY += (squares * sign);
            this.scene.tweens.add({
                targets: this,
                x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
                y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
                ease: 'Power1',
                duration: 200,
            });
        }
    }
}