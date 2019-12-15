export default class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }

    preload(){
        this.load.image('bg1', './sprites/bg1.png');
        this.load.image('bg2', './sprites/bg2.png');
        this.power = '';
    }

    create(){
        let bg1 = this.add.image(0, 0, 'bg1');
        bg1.scaleX = 3.5;
        bg1.scaleY = 5;

        let bg2 = this.add.image(350, 500, 'bg2');
        bg2.setOrigin(0.5);
        bg2.alpha = 0.6;
        bg2.scaleX = 4.5;
        bg2.scaleY = 7;

        let text1 = this.add.text(350, 200, 'Choose one\n    power:', { fontFamily: 'Josefin Sans', fontSize: 30, color: '#ffffff'});
        text1.setOrigin(0.5);

        let flashButton = this.add.text(350, 450, 'Flash', { fontFamily: 'Josefin Sans', fontSize: 40, color: '#aaaaaa'});
        flashButton.setOrigin(0.5);
        flashButton.setInteractive();
        flashButton.on('pointerdown', () => { this.power = 'flash'; flashButton.setColor('#ffffff'); tsButton.setColor('#aaaaaa')});

        let tsButton = this.add.text(350, 550, 'Time Stop', { fontFamily: 'Josefin Sans', fontSize: 40, color: '#aaaaaa'});
        tsButton.setOrigin(0.5);
        tsButton.setInteractive();
        tsButton.on('pointerdown', () => { this.power = 'timeStop'; tsButton.setColor('#ffffff'); flashButton.setColor('#aaaaaa') });

        let playButton = this.add.text(350, 750, 'Start', { fontFamily: 'Josefin Sans', fontSize: 75, color: '#ffffff'});
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {if (this.power == 'flash' || this.power == 'timeStop') this.scene.start('Game', this.power)});
    }
}