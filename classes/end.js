export default class End extends Phaser.Scene{
    constructor(){
        super('End');
    }

    preload(){
        this.load.image('bg1', './sprites/bg1.png');
        this.load.image('bg2', './sprites/bg2.png');
    }

    create(){
        let bg1 = this.add.image(0, 0, 'bg1');
        bg1.setOrigin(0,0)
        bg1.setScale(6.25)

        let bg2 = this.add.image(350, 500, 'bg2');
        bg2.setOrigin(0.5);
        bg2.alpha = 0.6;
        bg2.scaleX = 4;
        bg2.scaleY = 7;

        let text1 = this.add.text(350, 250, 'You made it!', { fontFamily: 'Josefin Sans', fontSize: 65, color: '#ffffff'});
        text1.setOrigin(0.5);

        let text2 = this.add.text(350, 400, 'Thank you for playing!\n\n(we accept donations)', { fontFamily: 'Josefin Sans', fontSize: 25, color: '#ffffff'});
        text2.setOrigin(0.5);

        let menuButton = this.add.text(350, 700, 'Go to main menu', { fontFamily: 'Josefin Sans', fontSize: 50, color: '#aaaaaa'});
        menuButton.setOrigin(0.5);
        menuButton.setInteractive();
        menuButton.on('pointerdown', () => {this.scene.start('Menu')});
    }
}