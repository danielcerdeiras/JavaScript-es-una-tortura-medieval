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
        this.link = link; //Valor que indica qué dos bloques están vinculados
        this.active = (active != 0);
        this.folding = false;
    }

    ChangeState() //Cambia el estado del bloque
    {
        this.active = !this.active;

        if(this.active)
            this.setTexture('block_act');
        else 
            this.setTexture('block_deact');
    }

    ChangeFolding() //Cambia el valor del booleano que indica si está plegando o no
    {
        this.folding = !this.folding;
    }

    CorrectPosition(squares, dir, fold) //Corrige la posición del bloque al plegarse/desplegarse el nivel
    {
        let sign = 1;
        if (!fold) sign = -1;
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