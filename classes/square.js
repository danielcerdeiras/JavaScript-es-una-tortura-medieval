import enemy from './enemy.js';

export default class Square extends enemy
{
    constructor(level, scene, x, y, width, height, sprite, dir, dir_2)
    {
        super(level, scene, x, y, width, height, sprite);
        this.dir = dir;
        this.secDir = dir_2;
        this.cont = 0;
        this.tween;
        this.square = level[y][x]; //Guarda el valor de la casilla que ocupa la bala en la matriz para restaurarlo cuando se mueva

        this.scene.anims.create({
            key:'right_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 6, end: 8 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'left_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 3, end: 5 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'up_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 9, end: 11 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'down_square',
            frames: this.scene.anims.generateFrameNumbers('square',{ start: 0, end: 2 }),
            frameRate:15,
            repeat:-1,
        });

        this.play('down_square');
    }

    Act()
    {
        let label = this.level[this.posY][this.posX];
        this.level[this.posY][this.posX] = 1;
        switch (this.cont)
        {
            case 0:
                switch (this.dir)
                {
                    case 2:
                        this.posY++;
                        this.play('down_square');
                        break;

                    case 4:
                        this.posX--;
                        this.play('left_square');
                        break;

                    case 6:
                        this.posX++;
                        this.play('right_square');
                        break;

                    case 8:
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;

            case 1:
                switch (this.secDir)
                {
                    case 2:
                        this.posY++;
                        this.play('down_square');
                        break;

                    case 4:
                        this.posX--;
                        this.play('left_square');
                        break;
    
                    case 6:
                        this.posX++;
                        this.play('right_square');
                        break;
    
                    case 8:
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;

            case 2:
                switch (10 - this.dir)
                {
                    case 2:
                        this.posY++;
                        this.play('down_square');
                        break;
    
                    case 4:
                        this.posX--;
                        this.play('left_square');
                        break;
    
                    case 6:
                        this.posX++;
                        this.play('right_square');
                        break;
    
                    case 8:
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;
    
            case 3:
                switch (10 - this.secDir)
                {
                    case 2:
                        this.posY++;
                        this.play('down_square');
                        break;
        
                    case 4:
                        this.posX--;
                        this.play('left_square');
                        break;
        
                    case 6:
                        this.posX++;
                        this.play('right_square');
                        break;
        
                    case 8:
                        this.posY--;
                        this.play('up_square');
                        break;
                }
                break;
        }


        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        this.level[this.posY][this.posX] = label;
        this.cont = this.cont + 1;
        if (this.cont > 3) this.cont = 0;
    }
}