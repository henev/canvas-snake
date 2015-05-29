(function(){
    // canvas variables
    var canvasId = 'snake-canvas';
    var canvasContext = '2d';
    var canvasWidth = 500;
    var canvasHeight = 500;

    // board variable
    var boardColor = '#000';
    var squareSize = 10;
    var lineWidth = '0.5';

    // snake variables
    var snakeColor = '#32cd32';
    var snakeSize = 5; // in squares
    var snakeSpeed = 100;

    var foodColor = '#ff0000';

    /**
     * A variable to block multiple keydown events in a single animation frame.
     * @var {boolean} blockMovement
     */
    var blockMovement = false;

    var canvas = new Canvas(canvasId, canvasContext);
    canvas.setDimensions(canvasWidth, canvasHeight);

    var board = new Board(squareSize);
    board.initialize(canvas.ctx, lineWidth, boardColor, canvasWidth, canvasHeight);

    var snake = new Snake(snakeSize, squareSize, snakeColor);
    snake.initialize(canvas.ctx, board.map, boardColor);

    var food = new Food(squareSize, foodColor);
    food.render(canvas.ctx, board.size, board.map);

    window.addEventListener('keydown', function(e) {
        if (!blockMovement) {
            blockMovement = keyDownEventHandler(e, snake);
        }
    }, true);

    snake.animation = setInterval(function() {
        snake.move(canvas.ctx, board.map, canvasWidth, canvasHeight, boardColor, board.size, food);
        blockMovement = false;
    }, snakeSpeed);
})();

/*
 *   @function keyDownEventHandler
 *
 *   @param {Object} e - Event arguments.
 *   @param {Object} snake - Snake object reference.
 *
 *   @returns {boolean}
 */
function keyDownEventHandler(e, snake) {
    var direction = snake.currentDirection;

    // Checks the direction the user chooses and compares with the snake's
    // current direction. If the direction is different than the same or 
    // an opposite direction - the direction changes
    switch(e.keyCode) {
        // Up arrow
        case 38:
            if (direction !== 'down' && direction !== 'up') {
                snake.currentDirection = 'up';

                return true;
            }
            break;
        // Right arrow
        case 39:
            if (direction !== 'left' && direction !== 'right') {
                snake.currentDirection = 'right';

                return true;
            }
            break;
        // Down arrow
        case 40:
            if (direction !== 'up' && direction !== 'down') {
                snake.currentDirection = 'down';

                return true;
            }
            break;
        // Left arrow
        case 37:
            if (direction !== 'right' && direction !== 'left') {
                snake.currentDirection = 'left';

                return true;
            }
            break;
        default:
            break;
    }
}

/*
 *   @function createMultidimensionalArray
 *
 *   @param {array[]} dimensions - How many dimensions will be the multidimensional array.
 *   @param value - What should be the default value of the last array elements.
 *
 *   @returns {array[]} array
 */
function createMultidimensionalArray(dimensions, value) {
    // Create new array
    var array = new Array(dimensions[0] || 0);
    var i = dimensions[0];

    // If dimensions array's length is bigger than 1
    // we start creating arrays in the array elements with recursions
    // to achieve multidimensional array
    if (dimensions.length > 1) {
        // Remove the first value from the array
        var args = Array.prototype.slice.call(dimensions, 1);
        // For each index in the created array create a new array with recursion
        while(i--) {
            array[dimensions[0]-1 - i] = createMultidimensionalArray(args, value);
        }
        // If there is only one element left in the dimensions array
        // assign value to each of the new array's elements if value is set as param
    } else {
        if (typeof value !== 'undefined') {
            while(i--) {
                array[dimensions[0]-1 - i] = value;
            }
        }
    }

    return array;
}