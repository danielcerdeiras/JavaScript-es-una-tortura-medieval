export default class Enemy extends Phaser.GameObjects.Sprites
{
    let dir;

    constructor(scene, x, y, width, height, d)
    {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.displayWidth = width;
        this.displayHeight = height;
        dir = d;
    }

    Shoot(dir)
    {

    }

    Move()
    {
        switch(dir)
        {
            case 1:
                this.x = this.x - 1;
                this.y = this.y - 1;
                break;

            case 2:
                this.y = this.y - 1;
                break;
                
            case 3:
                this.x = this.x + 1;
                this.y = this.y - 1;
                break;

            case 4:
                this.x = this.x - 1;
                break;

            case 6:
                this.x = this.x + 1;
                break;

            case 7:
                this.x = this.x - 1;
                this.y = this.y + 1;
                break;
                    
            case 8:
                this.y = this.y + 1;
                break;
    
            case 9:
                this.x = this.x + 1;
                this.y = this.y + 1;
                break;
        }

        ChangeDir()
        {
            dir = 10 - dir;
        }
    }
}