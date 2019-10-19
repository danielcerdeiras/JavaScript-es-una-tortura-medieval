export default class Level extends Phaser.GameObjects.Level
{
    constructor(level)
    {
        
        this.scene.add.existing(this);
        this.ReadLevel(level);
    }

    ReadLevel(level)
    {

    }
}