// TODO
// fix rendering issues

// add reqs for entering rooms
// log if door gets unlocked
// 

// figure out how tf i gon do entities


var settings = {
    screenSize: {
        w: 2400,
        h: 1350
    }
}

var inventory = {}
let currentRoom = "vanastue"


function startGame() {
    gameArea.start();

    drawBackgroundImage("bg.png")
    sleep(100).then(() => {
        drawCheese()
    })
}

function drawCheese() {
    let pointFrom = [0.25, 0.6]
    let pointTo = [0.915, 0.65]
    let dateFrom = 1684746000000
    let dateTo = 1687424400000
    let dateNow = Date.now()
    


    let totalTime = dateTo - dateFrom
    let timeLeft = totalTime - (dateTo - dateNow)
    let percentageDone = timeLeft/totalTime


    let xInterpolatedPoint = pointFrom[0] + ((pointTo[0] - pointFrom[0]) * percentageDone)
    let yInterpolatedPoint = pointFrom[1] + ((pointTo[1] - pointFrom[1]) * percentageDone)



    // let yInterpolatedPoint =

    drawObject(gameArea.ctx, xInterpolatedPoint, yInterpolatedPoint, 0.06, "ost.png")
    
}

$(window).resize(function () {
    fixCanvasSize()
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawBackgroundImage(imageId) {
    let img = new Image()
    img.src = imageId

    img.onload = () => {
        gameArea.ctx.drawImage(img, 0, 0, gameArea.canvas.width, gameArea.canvas.height);
    }
}

async function drawObject(context, x, y, size, imageURL) {
    let width = Math.floor(context.canvas.width * size)
    let height = Math.floor(context.canvas.height * size)
    let xoffset = (context.canvas.width - width) * x
    let yoffset = (context.canvas.height - height) * y

    let image = new Image()
    image.src = imageURL
    image.addEventListener('load', async () => {
        context.drawImage(image, xoffset, yoffset, width, height)
    })
}

function fixCanvasSize() {
    let screenAspectRatio = document.body.clientHeight / document.body.clientWidth
    let gameAspectRatio = gameArea.canvas.height / gameArea.canvas.width
    if (screenAspectRatio > gameAspectRatio) {
        gameArea.canvas.style.height = document.body.clientWidth * gameAspectRatio - 8;
    }
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        gameArea.canvas.width = settings.screenSize.w
        gameArea.canvas.height = settings.screenSize.h
        this.ctx = this.canvas.getContext("2d");

        fixCanvasSize()
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

startGame()
