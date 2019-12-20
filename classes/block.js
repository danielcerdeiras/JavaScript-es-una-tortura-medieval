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
        this.link = link; //Dos bloques con el mismo valor se pueden juntar entre si
        this.active = (active != 0);
        this.folding = false;
    }

    ChangeState()
    {
        this.active = !this.active; //Cambia el estado del juego

        if(this.active)
            this.setTexture('block_act');
        else 
            this.setTexture('block_deact');
    }

    ChangeFolding()
    {
        this.folding = !this.folding; //Cambia el booleano que indica si está o no plegando este bloque
    }

    CorrectPosition(squares, dir, fold) //Corrige la posición del bloque al plegar el nivel
    {
        let sign = 1;
        if (!fold) sign = -1; //Cambia el sentido del movimiento
        if (dir == 'horizontal')
        {
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