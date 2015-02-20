var Canvas = function(id, context) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext(context);
};

Canvas.prototype.setDimensions = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
};