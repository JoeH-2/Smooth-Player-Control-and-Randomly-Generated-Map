let x = 5
let y = 5

let myGamePiece
let Obstacles = []

let directionX = [0]
let directionY = [0]

let reasons = []

let overwriteX = 0
let overwriteY = 0

let confirmHit = 0

function Start() {
    myGameArea.stop()
    myGameArea.start()
    GenerateSquare()
}

function updateGameArea() {
    confirmHit = 0
    overwriteX = 0
    overwriteY = 0
    myGameArea.clear()
    myGamePiece.newPos()
    sensor.lead()
    for (i = 0; i < Obstacles.length; i++) {
        Obstacles[i].update()
        if (!sensor.collide(Obstacles[i])) {
            confirmHit = 1
            console.log("Collision")
            console.log(reasons)
        }
    }
    if (myGamePiece.y + (directionY[0] * 2) < 0) {
        myGamePiece.speedY = 0
        overwriteY = 1
    }
    else if (myGamePiece.y + (directionY[0] * 2) > 590) {
        myGamePiece.speedY = 0
        overwriteY = 1
    }

    if (myGamePiece.x + (directionX[0] * 2) < 0) {
        myGamePiece.speedX = 0
        overwriteX = 1
    }
    else if (myGamePiece.x + (directionX[0] * 2) > 940) {
        myGamePiece.speedX = 0
        overwriteX = 1
    }
    if (confirmHit == 1) {
        if (reasons.includes("top") || reasons.includes("bot")) {
            myGamePiece.speedY = 0
            overwriteY = 1
        }
        if (reasons.includes("left") || reasons.includes("right")) {
            myGamePiece.speedX = 0
            overwriteX = 1
        }
    }

    if (overwriteX == 0) {
        myGamePiece.speedX = directionX[0]
        
    }
    if (overwriteY == 0) {
        myGamePiece.speedY = directionY[0]
    }
    reasons = []
    myGamePiece.update()


}

let myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 650;
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop : function() {
        clearInterval(this.interval)
    }
}

function GenerateSquare() {
    let color = 'hsl('+ 360 * Math.random() + ', 75%, 50%)'
    myGamePiece = new component(60, 60, "black", "white", x, y )
    sensor = new component(60, 60, "green", "green", x, y )
    canvas = document.getElementById("myCanvas")
    let confirm = 0
    color = "black"
    let amount = 20
    let minDimension = 50
    for (i = 0; i < amount; i ++) {
        width = Math.floor(Math.random() * (150 - minDimension)) + minDimension
        height = Math.floor(Math.random() * (150 - minDimension)) + minDimension
        while (width % 5 != 0) {
            width = Math.floor(Math.random() * (150 - minDimension)) + minDimension
        }
        while (height % 5 != 0) {
            height = Math.floor(Math.random() * (150 - minDimension)) + minDimension
        }
        let bx = Math.floor(Math.random() * (canvas.width - width))
        let by = Math.floor(Math.random() * (canvas.height - height))
        while (bx % 5 != 0) {
            bx = Math.floor(Math.random() * (canvas.width - width))
        }
        while (by % 5 != 0) {
            by = Math.floor(Math.random() * (canvas.height - height))
        }
        Obstacles[i] = new component(width, height, color, "white", bx,  by)
        confirm = 0
        while (confirm == 0) {
            z = 0
            while (z < Obstacles.length) {
                if (Obstacles[i] != Obstacles[z]) {
                    //console.log(Obstacles[i])
                    //console.log(Obstacles[i].objectCheck(Obstacles[z]))
                    if ((!Obstacles[i].objectCheck(Obstacles[z])) || (!Obstacles[i].objectCheck(myGamePiece))) {
                        //console.log("Change")
                        //console.log(Obstacles[z].x)
                        //console.log(Obstacles[z].y)
                        //console.log(Obstacles[i].x)
                        //console.log(Obstacles[i].y)
                        bx = Math.floor(Math.random() * (canvas.width - width))
                        by = Math.floor(Math.random() * (canvas.height - height))           
                        while (bx % 5 != 0) {
                            bx = Math.floor(Math.random() * (canvas.width - width))
                        }
                        while (by % 5 != 0) {
                            by = Math.floor(Math.random() * (canvas.height - height))
                        }
                        Obstacles[i] = new component(width, height, color, "white", bx, by)
                        z = 0
                        confirm = 0
                    }
                    else {
                        //console.log(Obstacles[z].x)
                        //console.log(Obstacles[z].y)
                        //console.log(Obstacles[i].x)
                        //console.log(Obstacles[i].y)
                        confirm = 1
                        //console.log("fine")
                        z++
                    }
                }
                else {
                    confirm = 1
                    //console.log(Obstacles[i])
                    //console.log("Skip")
                    z++
                }
            }
        }
    }
}

function component(width, height, color, border, x, y) {
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = border
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.lead = function() {
        if (directionX[0] == -5) {
            this.x = myGamePiece.x + directionX[0]
            this.width = myGamePiece.width + directionX[0] * -1
        }
        if (directionX[0] == 5) {
            this.x = myGamePiece.x
            this.width = myGamePiece.width + directionX[0]
        }
        if (directionY[0] == -5) {
            this.y = myGamePiece.y + directionY[0]
            this.height = myGamePiece.height  + directionY[0] * -1
        }
        if (directionY[0] == 5) {
            this.y = myGamePiece.y
            this.height = myGamePiece.height + directionY[0]
        }
        if (directionX[0] == 0){
            this.x = myGamePiece.x
            this.width = myGamePiece.width
        }
        if (directionY[0] == 0){
            this.y = myGamePiece.y
            this.height = myGamePiece.height
        }
    }
    this.collide = function(object) {
        let playerLeft = this.x
        let playerRight = this.x + (this.width)
        let playerTop = this.y
        let playerBottom = this.y + (this.height)
        let objectLeft = object.x
        let objectRight = object.x + (object.width)
        let objectTop = object.y
        let objectBottom = object.y + (object.height)
        collision = false

        if ((playerBottom < objectTop) ||
        (playerTop > objectBottom) ||
        (playerRight < objectLeft) ||
        (playerLeft > objectRight)) {
            collision = true
    }
        if (collision == false) {
            if (objectLeft - playerRight == 0) {
                if (!reasons.includes("right")){
                    reasons.splice(0,0,"right")
                    console.log(playerRight)
                    console.log(objectLeft)
                }
            }
            if (playerLeft - objectRight == 0) {
                if (!reasons.includes("left")){
                    reasons.splice(0,0,"left")
                    console.log(playerLeft)
                    console.log(objectRight)
                }
            }
            if (objectTop - playerBottom == 0) {
                if (!reasons.includes("bot")) {
                    reasons.splice(0,0,"bot")
                    console.log(playerBottom)
                    console.log(objectTop)
                }
            }

            if (playerTop - objectBottom == 0) {
                if (!reasons.includes("top")){
                    reasons.splice(0,0,"top")
                    console.log(playerTop)
                    console.log(objectBottom)
                }
            }
            // On corner hit
            if (reasons.length > 1) {
                let i = 0
                while (i < reasons.length) {
                    switch (reasons[i]) {
                        case "top":
                            if (playerTop + directionY[0] > objectBottom) {
                                console.log("Safe")
                                reasons.splice(i,1)
                            }
                            break
                        case "bot":
                            if (playerBottom + directionY[0] < objectTop) {
                                console.log("Safe2")
                                reasons.splice(i,1)
                            }
                            break
                        case "right":
                            if (playerRight + directionX[0] < objectLeft) {
                                console.log("Safe3")
                                reasons.splice(i,1)
                            }
                            break
                        case "left":
                            if (playerLeft + directionX[0] > objectRight) {
                                console.log("Safe4")
                                reasons.splice(i,1)
                            }
                            break
                    }
                    i ++
                }
            }
        }
        return collision
    }
    this.objectCheck = function(object) {
        let playerLeft = this.x
        let playerRight = this.x + (this.width)
        let playerTop = this.y
        let playerBottom = this.y + (this.height)
        let objectLeft = object.x
        let objectRight = object.x + (object.width)
        let objectTop = object.y
        let objectBottom = object.y + (object.height)
        collision = false
        if ((playerBottom < objectTop) ||
            (playerTop > objectBottom) ||
            (playerRight < objectLeft) ||
            (playerLeft > objectRight)) {
                collision = true
        }
        return collision
    }
}

window.onkeydown = function (event) {
    if (event.key == "w") {
        if (directionY[0] != -5) {
            if (directionY.length > 0) {
                directionY.splice(1,1,directionY[0])
            }
            directionY.splice(0,1,-5)
        }
    }
    if (event.key == "a") {
        if (directionX[0] != -5) {
            if (directionX.length > 0) {
                directionX.splice(1,1,directionX[0])
            }
            directionX.splice(0,1,-5)
        }
        
    }
    if (event.key == "s") {
        if (directionY[0] != 5) {
            if (directionY.length > 0) {
                directionY.splice(1,1,directionY[0])
            }
            directionY.splice(0,1,5)
        }
    }
    if (event.key == "d") {
        if (directionX[0] != 5) {
            if (directionX.length > 0) {
                directionX.splice(1,1,directionX[0])
            }
            directionX.splice(0,1,5)
        }
    }
}

window.onkeyup = function (event) {
    if (event.key == "w") {
        for (i = 0; i < directionY.length; i ++) {
            if (directionY[i] == -5) {
                directionY.splice(i,1)
                if (directionY.length == 0) {
                    directionY.splice(0,1,0)
                }
            }
        }
    }
    if (event.key == "a") {
        for (i = 0; i < directionX.length; i ++) {
            if (directionX[i] == -5) {
                directionX.splice(i,1)
                if (directionX.length == 0) {
                    directionX.splice(0,1,0)
                }
            }
        }
    }
    if (event.key == "s") {
        for (i = 0; i < directionY.length; i ++) {
            if (directionY[i] == 5) {
                directionY.splice(i,1)
                if (directionY.length == 0) {
                    directionY.splice(0,1,0)
                }
            }
        }
    }
    if (event.key == "d") {
        for (i = 0; i < directionX.length; i ++) {
            if (directionX[i] == 5) {
                directionX.splice(i,1)
                if (directionX.length == 0) {
                    directionX.splice(0,1,0)
                }
            }
        }
    }
}