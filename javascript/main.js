(function(){
    var boardColor = '#000';
    var snakeColor = '#32cd32';
    var foodColor = '#ff0000';

    var squareSize = 10;
    var snakeSize = 5; // in squares

    var canvasWidth = 500;
    var canvasHeight = 500;

    var animation = null;
    var speed = 100;

    var blockMovement = false;

    var canvas = new Canvas('snake-canvas', '2d');
    canvas.setDimensions(canvasWidth, canvasHeight);

    var board = new Board(squareSize);
    board.initialize(canvas.ctx, '0.5', boardColor, canvasWidth, canvasHeight);

    var snake = new Snake(snakeSize, squareSize, snakeColor);
    snake.initialize(canvas.ctx, board.map, boardColor);

    var food = new Food(squareSize, foodColor);
    food.render(canvas.ctx, board.size, board.map);

    window.addEventListener('keydown', function(e) {
        if (!blockMovement) {
            blockMovement = keyDownEvent(e, snake);
        }
    }, true);

    snake.animation = setInterval(function() {
        snake.move(canvas.ctx, board.map, canvasWidth, canvasHeight, boardColor, board.size, food);
        blockMovement = false;
    }, speed);
})();

function keyDownEvent(e, snake) {
    var direction = snake.currentDirection;
    switch(e.keyCode) {
        case 38:
            if (direction !== 'down' && direction !== 'up') {
                snake.currentDirection = 'up';

                return true;
            }
            break;
        case 39:
            if (direction !== 'left' && direction !== 'right') {
                snake.currentDirection = 'right';

                return true;
            }
            break;
        case 40:
            if (direction !== 'up' && direction !== 'down') {
                snake.currentDirection = 'down';

                return true;
            }
            break;
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
 *   Function to create an n-dimensional array
 *
 *   @param array dimensions
 *   @param any type value
 *
 *   @return array array
 */
function createArray(dimensions, value) {
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
            array[dimensions[0]-1 - i] = createArray(args, value);
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