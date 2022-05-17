// Constantes de escenario

const columns = 40
const rows = 30
const lado = 20
const width_canvas = columns *  lado
const height_canvas = rows * lado

// Variables de escenario

let snake
let food

// Variables de control

let up
let der
let izq
let down

// Variables del entorno html

let canvas 


// Funciones

function setup() {
    frameRate(10)
    canvas = createCanvas(width_canvas, height_canvas);
    windowRisized();
    snake = new Snake();
    food = createVector()
    up = createVector(0, -1);
    down = createVector(0, 1);
    der = createVector(1, 0);
    izq = createVector(-1, 0);
}
  
function windowRisized(){
    let scale = windowWidth/width
    if(scale >= 1){
        return
    }
    canvas.style("width", width * scale + "px")
    canvas.style("height", height * scale + "px")
}

function draw() {
    background(0);
    snake.draw();
    fill(69, 230, 5)
    rect(food.x * lado, food.y * lado, lado, lado)
    if(snake.position.dist(food) == 0) {
        snake.size++;
        possFood();
    }
}

function keyPressed() {
    if(!isLooping()){
        newGame()
    }
    switch (keyCode) {
        case UP_ARROW:
            if(snake.tail.length && snake.aceleration == down) {
            break
            }
            snake.aceleration = up
            break;
        case RIGHT_ARROW:
            if(snake.tail.length && snake.aceleration == izq) {
            break
            }
            snake.aceleration = der
            break;
        case DOWN_ARROW:
            if(snake.tail.length && snake.aceleration == up) {
                break
                }
            snake.aceleration = down
            break;
        case LEFT_ARROW:
            if(snake.tail.length && snake.aceleration == der) {
                break
                }
            snake.aceleration = izq
            break;
        default:
            break;
    }
}

function possFood() {
    food = createVector(
        int(random(columns)),
        int(random(rows))
    )
}

function newGame() {
    snake = new Snake();
    loop();
}

function gameOver() {
    if(snake.sistemaDeChoque()) {
        textAlign(CENTER, CENTER)
        textSize(50)
        text("Game Over", width/2, height/2)
        noLoop()
    }
}

function Snake(){
    this.position = createVector(
        columns / 2,
        rows / 2
    )
    this.aceleration = createVector()
    this.tail = []
    this.size = 0;
    this.sistemaDeChoque = function() {
        if(this.position.x < 0 || this.position.y < 0) {
            return true
        }
        if(this.position.x >= columns || this.position.y >= rows) {
            return true
        }
        for (const c of this.tail) {
            if(this.position.equals(c)) {
                return true;
            }
        }
        return false
    }
    this.draw = function(){
        fill(5, 223, 230)
        rect(
            constrain(this.position.x, 0, columns - 1 ) * lado, 
            constrain(this.position.y, 0, rows - 1) * lado, lado, lado)
        for (const c of this.tail) {
            rect(
                constrain(c.x, 0, columns - 1 ) * lado, 
                constrain(c.y, 0, rows - 1) * lado, lado, lado)
        }
        gameOver()
        this.tail.push(this.position.copy())
        if(this.tail.length > this.size) {
            this.tail.splice(0, 1)
        }
        this.position.add(this.aceleration)
    }
}