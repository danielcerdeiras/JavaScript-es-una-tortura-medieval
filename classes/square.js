import Enemy from './enemy.js';

export default class Square extends Enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir, dir_2)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir = dir;
        this.secDir = dir_2;
        this.cont = 0;

        this.scene.anims.create({
            key:'right_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 6, end: 8 }),
            frameRate:10,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'left_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 3, end: 5 }),
            frameRate:10,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'up_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 9, end: 11 }),
            frameRate:10,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'down_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 0, end: 2 }),
            frameRate:10,
            repeat:-1,
        });

        this.play('down_square');
    }

    Act() //Se mueve: dir1 -> dir2 -> !dir1 -> !dir2 -> dir1...
    {
        this.level[this.posY][this.posX] = { type: this.square };
        switch (this.cont)
        {
            case 0:
                switch (this.dir)
                {
                    case 'down':
                        this.posY++;
                        this.play('down_square');
                        break;

                    case 'left':
                        this.posX--;
                        this.play('left_square');
                        break;

                    case 'right':
                        this.posX++;
                        this.play('right_square');
                        break;

                    case 'up':
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;

            case 1:
                switch (this.secDir)
                {
                    case 'down':
                        this.posY++;
                        this.play('down_square');
                        break;

                    case 'left':
                        this.posX--;
                        this.play('left_square');
                        break;
    
                    case 'right':
                        this.posX++;
                        this.play('right_square');
                        break;
    
                    case 'up':
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;

            case 2:
                switch (this.OppDir(this.dir))
                {
                    case 'down':
                        this.posY++;
                        this.play('down_square');
                        break;
    
                    case 'left':
                        this.posX--;
                        this.play('left_square');
                        break;
    
                    case 'right':
                        this.posX++;
                        this.play('right_square');
                        break;
    
                    case 'up':
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;
    
            case 3:
                switch (this.OppDir(this.secDir))
                {
                    case 'down':
                        this.posY++;
                        this.play('down_square');
                        break;
        
                    case 'left':
                        this.posX--;
                        this.play('left_square');
                        break;
        
                    case 'right':
                        this.posX++;
                        this.play('right_square');
                        break;
        
                    case 'up':
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;
        }

        this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        this.square = this.level[this.posY][this.posX].type;
        this.level[this.posY][this.posX] = { type: 'square'} //Sobreescribe su nueva posición con su valor y restaura el de la casilla anterior que ocupaba
        this.cont = this.cont + 1;
        if (this.cont > 3) this.cont = 0;
    }
}