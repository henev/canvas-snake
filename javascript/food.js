var Food = function(size, color) {
    this.size = size;
    this.color = color;
};

Food.prototype.render = function(ctx, boardSize, map) {
    var x = Math.floor((Math.random() * boardSize.x - 1) + 0);
    var y = Math.floor((Math.random() * boardSize.y - 1) + 0);

    if (map[x][y] === 'empty') {
        ctx.fillStyle = this.color;
        ctx.fillRect(x * this.size, y * this.size, this.size, this.size);
        map[x][y] = 'food';
    } else {
        this.render(ctx, boardSize, map);
    }
};

Food.prototype.eat = function(ctx, map, snakeBody, boardColor) {
    ctx.fillStyle = boardColor;
    ctx.fillRect(snakeBody[0].x, snakeBody[0].y, this.size, this.size);

    map[snakeBody[0].x / this.size][snakeBody[0].y / this.size] = 'empty';
};