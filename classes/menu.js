export default class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
        this.windowHeight = 1000;
        this.windowWidth = 700;
    }

    preload(){
        this.texts = [];
        this.load.image('bg1', './sprites/bg1.png');
        this.load.image('bg2', './sprites/bg2.png');
        this.power = '';
    }

    create(){
        let bg1 = this.add.image(0, 0, 'bg1');
        bg1.setOrigin(0,0)
        bg1.setScale(6.25)

        let bg2 = this.add.image(this.windowWidth / 2, 500, 'bg2');
        bg2.setOrigin(0.5);
        bg2.alpha = 0.6;
        bg2.scaleX = 4; bg2.scaleY = 7;

        let text1 = this.add.text(this.windowWidth / 2, 200, 'Choose your\n    power:', { fontFamily: 'Josefin Sans', fontSize: 30, color: '#ffffff'});
        text1.setOrigin(0.5);

        const InteractiveText = (text, size, posX, posY, funct) => {
            let t = this.add.text(posX, posY, text, { fontFamily: 'Josefin Sans', fontSize: size, color: '#aaaaaa'});
            t.setOrigin(0.5);
            t.setInteractive();
            t.on('pointerdown', funct);
            this.texts.push(t);
        }

        InteractiveText('Flash', 40, this.windowWidth / 2, 450, () => { this.power = 'flash'; this.texts[0].setColor('#ffffff'); this.texts[1].setColor('#aaaaaa')});
        InteractiveText('Time Stop', 40, this.windowWidth / 2, 550, () => { this.power = 'timeStop'; this.texts[1].setColor('#ffffff'); this.texts[0].setColor('#aaaaaa') });
        InteractiveText('Start', 75, this.windowWidth / 2, 750, () => {if (this.power == 'flash' || this.power == 'timeStop') this.scene.start('Game', {power: this.power, level: 0 })});
    }
}