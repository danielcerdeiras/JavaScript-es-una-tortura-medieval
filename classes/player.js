export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(level, scene, x, y, width, height, sprite, power)
    {
        super(scene, (x * width + width / 2), (y * height + height / 2), sprite);
        this.scene.add.existing(this);
        this.posX = x;
        this.posY = y;
        this.displayWidth = width;
        this.displayHeight = height;
        this.level = level
        this.power = power;
        this.powerUsed = false;
        this.speed = 1;
        this.tween;
        
        this.scene.anims.create({
            key:'standing_player',
            frames: this.scene.anims.generateFrameNumbers('player',{ start: 1, end: 1 }),
            frameRate:15,
            repeat:-1,
        });

        this.scene.anims.create({
            key:'up_player',
            frames: this.scene.anims.generateFrameNumbers('player',{ start: 9, end: 11 }),
            frameRate:15,
            repeat:0,
        });

        this.scene.anims.create({
            key:'down_player',
            frames: this.scene.anims.generateFrameNumbers('player',{ start: 0, end: 2 }),
            frameRate:15,
            repeat:0,
        });

        this.scene.anims.create({
            key:'left_player',
            frames: this.scene.anims.generateFrameNumbers('player',{ start: 3, end: 5 }),
            frameRate:15,
            repeat:0,
        });

        this.scene.anims.create({
            key:'right_player',
            frames: this.scene.anims.generateFrameNumbers('player',{ start: 6, end: 8 }),
            frameRate:15,
            repeat:0,
        });

        switch (power)
        {
            case 'timeStop':
                this.cooldown = 10;
                break;

            case 'flash':
                this.cooldown = 6;
                break;
        }

        this.time = this.cooldown;

        this.play('standing_player')
        var style = { font: "40px Arial", align: "center"};
        this.text = this.scene.add.text(this.posX * width + (width / 2.5), this.posY * height + (height / 3), this.cooldown - this.time, style);
    }

    Move(dir)
    {
        let moved = true;
        this.speed = 1;
        if(this.power == 'flash' && this.powerUsed){
        this.speed = 2;
        this.scene.flashSound.play()
        }
        else this.scene.movementSound.play()

        let value;
        switch(dir)
        {
            case 2:
                value = this.level[this.posY + this.speed][this.posX];
                if(value != 2 && Math.trunc(value / 100) != 5)
                {
                    this.posY += this.speed;
                    this.play('down_player')
                }
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX, this.posY + this.speed);
                    moved = false;
                }
                else moved = false;
                break;
                
            case 4:
                value = this.level[this.posY][this.posX - this.speed];
                if(value != 2 && Math.trunc(value / 100) != 5)
                {               
                    this.posX -= this.speed;
                    this.play('left_player') 
                }
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX - this.speed, this.posY);
                    moved = false;
                }
                else moved = false;
                break;

            case 6:
                value = this.level[this.posY][this.posX + this.speed];
                if(value != 2 && Math.trunc(value / 100) != 5){
                    this.posX += this.speed;
                    this.play('right_player') 
                }   
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX + this.speed, this.posY);
                    moved = false;
                }
                else moved = false;
                break;

            case 8:
                value = this.level[this.posY - this.speed][this.posX];
                if(value != 2 && Math.trunc(value / 100) != 5){
                    this.posY -= this.speed;
                    this.play('up_player') 
                }
                else if (Math.trunc(value / 100) == 5)
                {
                    this.scene.BlockCollision(this.posX, this.posY - this.speed);
                    moved = false;
                }
                else {moved = false;}
                break;
        }
        this.tween = this.scene.tweens.add({
            targets: this,
            x: (this.posX * this.displayWidth) + (this.displayWidth / 2),
            y: (this.posY * this.displayHeight) + (this.displayHeight / 2),
            ease: 'Power1',
            duration: 200,
        });

        if (!this.powerUsed && moved && this.time < this.cooldown)
            this.time++;

        this.text.setText(this.cooldown - this.time);
        this.tween = this.scene.tweens.add({
            targets: this.text,
            x: (this.posX * this.displayWidth + (this.displayWidth / 2.5)),
            y: (this.posY * this.displayHeight + (this.displayHeight / 3)),
            ease: 'Power1',
            duration: 200,
            });

        return (moved);
    }

    UsePower()
    {
        if (this.time >= this.cooldown)
        {
            if(this.power == 'timeStop')
                this.scene.timeStopSound.play();
            this.powerUsed = true;
            this.time = 0;
        }
    }

    LevelChanged(level)
    {
        this.level  = level;
    }

    CorrectPosition(squares, dir)
    {
        if (dir == 'horizontal')
            this.posX += squares;
        else
            this.posY += squares;

        this.tween = this.scene.tweens.add({
            targets: this.text,
            x: (this.posX * this.displayWidth + (this.displayWidth / 2.5)),
            y: (this.posY * this.displayHeight + (this.displayHeight / 3)),
            ease: 'Power1',
            duration: 200,
            });    
    }

    Displace(dir)
    {
        if (dir == 'horizontal')
        {
            if (this.level[this.posY + 1][this.posX] != 2)
                this.posY++
            else
                this.posY--;
        }
        else
        {
            if (this.level[this.posY][this.posX + 1] != 2)
                this.posX++
            else
                this.posX--; 
        }

        this.tween = this.scene.tweens.add({
            targets: this.text,
            x: (this.posX * this.displayWidth + (this.displayWidth / 2.5)),
            y: (this.posY * this.displayHeight + (this.displayHeight / 3)),
            ease: 'Power1',
            duration: 200,
            });
    }
}