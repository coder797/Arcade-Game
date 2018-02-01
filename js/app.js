
'use strict';

class Character {
    constructor(x, y, sprite, speed = 0) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    constructor(x = 50, y = 80, sprite = enemyImage, speed = 0) {
        super(x, y, sprite, speed);
        this.width = 75;
        this.height = 50;
    }

    collisionDetection() {
        if (player.x <= this.x + this.width && player.x + player.width >= this.x && player.y <= this.y + this.height && player.height + player.y >= this.y) {
            console.log('collided');
            //check if lives are equal to 0 on detection
            if (+$('.lives-number').text() === 1) {
                player.resetPlayer();
                +$('.lives-number').text(5);
                +$('.score-number').text(0);
            }
            else {
                player.resetPlayer();
                +$('.lives-number').text(+$('.lives-number').text() - 1);

            }

        }
    }

    update(dt) {
        this.x += this.speed * dt;
        //check if enemy reaches end then reset it to start
        if (this.x >= 505) {
            this.x = 0;
        }
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        //increase the speed for difficulty
        this.speed += 0.005;
        //call collision function
        this.collisionDetection();
    }
}

class Player extends Character {
    constructor(x = 202.5, y = 383, sprite, speed) {
        super(x, y, sprite, speed);
        this.width = 50;
        this.height = 50;
    }

    resetPlayer() {
        this.x = 202.5;
        this.y = 383;
    }

    update() {

    }

    handleInput(keyPress) {
        // This listens for key presses and sends the keys to your

        if (keyPress === 'left') {
            this.x -= this.speed;

        }
        if (keyPress === 'up') {
            this.y -= this.speed - 20;
        }
        if (keyPress === 'right') {
            this.x += this.speed;

        }
        if (keyPress === 'down') {
            this.y += this.speed - 20;
        }
        //make sure player cannot cross canvas
        if (this.y > 383) {
            this.y = 383;
        }
        if (this.x > 402.5) {
            this.x = 402.5;
        }
        if (this.x < 2.5) {
            this.x = 2.5
        }
        //make sure player when wins resets its position
        if (this.y <= -17) {
            this.resetPlayer();
            console.log('you won');
            // update the score

            +$('.score-number').text(+$('.score-number').text() + 100);


        }
    }
}

// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyImage = 'images/enemy-bug.png';
var allEnemies = [new Enemy(0, 50, enemyImage, 80), new Enemy(0, 50, enemyImage, 70), new Enemy(0, 130, enemyImage, 70), new Enemy(0, 220, enemyImage, 80), new Enemy(0, 120, enemyImage, 190)];
var player = new Player(202.5, 383, 'images/char-boy.png', 100);