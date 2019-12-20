import Enemy from './enemy.js';

export default class Zigzag extends Enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir1, dir2)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir1 = dir1;
        this.dir2 = dir2;
        this.cont = 0;

        this.scene.anims.create({
            key:'right_zigzag',
            frames: this.scene.anims.generateFrameNumbers('zigzag',{ start: 6, end: 8 }),
            frameRate:5,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'left_zigzag',
            frames: this.scene.anims.generateFrameNumbers('zigzag',{ start: 3, end: 5 }),
            frameRate:5,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'up_zigzag',
            frames: this.scene.anims.generateFrameNumbers('zigzag',{ start: 9, end: 11 }),
            frameRate:5,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'down_zigzag',
            frames: this.scene.anims.generateFrameNumbers('zigzag',{ start: 0, end: 2 }),
            frameRate:5,
            repeat:-1,
        });

        this.play('down_zigzag');
    }

    Cases(cond, op1, op2, val) //Refactorización de código :)
    {
        switch(cond)
        {
            case 'down':
                op2 += val;
                break;
                
            case 'left':
                op1 -= val;
                break;

            case 'right':
                op1 += val;
                break;
                    
            case 'up':
                op2 -= val;
                break;
        }
        return {op1, op2};
    }

    Act() //Se mueve en la dirección dir1 hasta colisionar con una pared, invirtiendo su dirección
          //Se mueve constrantemente en el eje contrario a dir1 con valores -1, 0, +1
    {
        this.level[this.posY][this.posX] = { type: this.square };
        let sign = -1;
        if (this.cont % 3 == 0) sign = 1;

        let result;
        let xInc = 0;
        let yInc = 0;

        result = this.Cases(this.dir1, xInc, yInc, 1); xInc = result.op1; yInc = result.op2;
        result = this.Cases(this.dir2, this.posX, this.posY, sign); this.posX = result.op1; this.posY = result.op2;
        this.Attempt(xInc, yInc);

        this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        this.cont++;
        if (this.cont > 3) this.cont = 0;
    }

    Attempt(xInc, yInc) //Valora la posición a la que intenta moverse y actúa acorde
    {
        if (this.level[this.posY + yInc][this.posX + xInc].type != 'wall')
        {
            this.posX += xInc;
            this.posY += yInc;
        }
        else
        {
            this.dir1 = this.OppDir(this.dir1);
            let result;
            result = this.Cases(this.dir1, this.posX, this.posY, 1); this.posX = result.op1; this.posY = result.op2;
        }
        this.square = this.level[this.posY][this.posX].type;
        this.level[this.posY][this.posX] = { type: 'zigzag' };
    }
}