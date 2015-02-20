var Board = function(squareSide) {
    this.squareSide = squareSide;
};

Board.prototype.initialize = function(ctx, lineWidth, fillColor, width, height) {
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;

    ctx.fillRect(0, 0, width, height);

    this.size = {
        x: width / this.squareSide,
        y: height / this.squareSide
    };
    this.map = createArray([this.size.x, this.size.y], 'empty');
};