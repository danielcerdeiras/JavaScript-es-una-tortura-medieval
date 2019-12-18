export default class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(level, scene, x, y, width, height, sprite)
    {
        super(scene, (x * width + width / 2), (y * height + height / 2), sprite);
        this.scene.add.existing(this);
        this.posX = x;
        this.posY = y;
        this.displayWidth = width;
        this.displayHeight = height;
        this.level = level
    }

    LevelChanged(level)
    {
        this.level = level;
    }

    CorrectPosition(squares, dir)
    {
        this.level[this.posY][this.posX] = this.square;
        if (dir == 'horizontal')
        {
            this.posX += squares;
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
            this.posY += squares;
            this.scene.tweens.add({
                targets: this,
                x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
                y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
                ease: 'Power1',
                duration: 200,
            });
        }
        this.square = this.level[this.posY][this.posX];
        this.level[this.posY][this.posX] = -1; //Valor que se reconozca como enemigo
    }

    Freeze(inv)
    {
        if (!inv)// && !this.freeze)
        {
            //this.freeze = true;
            this.setActive(false);
            this.setVisible(false);
        }
        else if (inv)// && this.freeze)
        {
            //this.freeze = false;
            this.setActive(true);
            this.setVisible(true);
        } 
    }
}