var Snake = function(snakeSize, headSize, snakeColor, strokeColor) {
    this.body = [];
    this.snakeSize = snakeSize;
    this.headSize = headSize;
    this.color = snakeColor;
    this.strokeColor = strokeColor;
    this.directions = {
        'right': {
            x: 1,
            y: 0
        },
        'left': {
            x: -1,
            y: 0
        },
        'up': {
            x: 0,
            y: -1
        },
        'down': {
            x: 0,
            y: 1
        }
    };
    this.currentDirection = 'right';
    this.animation = null;
};

Snake.prototype.initialize = function(ctx, map) {
    var newHead = {};

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;

    for (var i = 0; i < this.snakeSize; i++) {
        newHead = {
            x: i * this.headSize,
            y: 0
        };
        this.body.push(newHead);

        ctx.fillRect(newHead.x, newHead.y, this.headSize, this.headSize);
        ctx.strokeRect(newHead.x, newHead.y, this.headSize, this.headSize);

        var xMapPosition = newHead.x / this.headSize;
        var yMapPosition = newHead.y / this.headSize;

        map[xMapPosition][yMapPosition] = 'snake';
    }
};

Snake.prototype.move = function(ctx, map, boardWidth, boardHeight, boardColor, boardSize, food) {
    var lastHead = this.body[this.body.length - 1];
    var newHead = {
        x: lastHead.x + this.directions[this.currentDirection].x * this.headSize,
        y: lastHead.y + this.directions[this.currentDirection].y * this.headSize
    };

    ctx.lineWidth = '0.5';

    var hasSnakeHitXWall = newHead.y < 0 || newHead.y > boardHeight - this.headSize;
    var hasSnakeHitYWall = newHead.x < 0 || newHead.x > boardWidth - this.headSize;

    if (hasSnakeHitXWall || hasSnakeHitYWall ||
        map[newHead.x / this.headSize][newHead.y / this.headSize] === 'snake') {

        clearInterval(this.animation);
        alert('Game Over!\nYour points are: ' + (this.body.length - 5) * 100);

        return false;
    }

    if (map[newHead.x / this.headSize][newHead.y / this.headSize] === 'empty') {
        food.eat(ctx, map, this.body, boardColor);

        this.body.splice(0, 1);
    } else {
        food.render(ctx, boardSize, map);
    }

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;

    ctx.fillRect(newHead.x, newHead.y, this.headSize, this.headSize);
    ctx.strokeRect(newHead.x, newHead.y, this.headSize, this.headSize);

    this.body.push(newHead);
    map[newHead.x / this.headSize][newHead.y / this.headSize] = 'snake';
};