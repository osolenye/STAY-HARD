// let canvas;
// let ctx;
// let gBArrayHeight = 20; // Number of cells in array height
// let gBArrayWidth = 12; // Number of cells in array width
// let startX = 4; // Starting X position for Tetromino
// let startY = 0; // Starting Y position for Tetromino
// let score = 0; // Tracks the score
// let level = 1; // Tracks current level
// let winOrLose = "Playing";
// // Used as a look up table where each value in the array
// // contains the x & y position we can use to draw the
// // box on the canvas
// let coordinateArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

// let curTetromino = [[1,0], [0,1], [1,1], [2,1]];

// // 3. Will hold all the Tetrominos 
// let tetrominos = [];
// // 3. The tetromino array with the colors matched to the tetrominos array
// let tetrominoColors = ['purple','cyan','blue','yellow','orange','green','red'];
// // 3. Holds current Tetromino color
// let curTetrominoColor;

// // 4. Create gameboard array so we know where other squares are
// let gameBoardArray = [...Array(20)].map(e => Array(12).fill(0));

// // 6. Array for storing stopped shapes
// // It will hold colors when a shape stops and is added
// let stoppedShapeArray = [...Array(20)].map(e => Array(12).fill(0));

// // 4. Created to track the direction I'm moving the Tetromino
// // so that I can stop trying to move through walls
// let DIRECTION = {
//     IDLE: 0,
//     DOWN: 1,
//     LEFT: 2,
//     RIGHT: 3
// };
// let direction;

// class Coordinates{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//     }
// }

// // Execute SetupCanvas when page loads
// document.addEventListener('DOMContentLoaded', SetupCanvas); 

// // Creates the array with square coordinates [Lookup Table]
// // [0,0] Pixels X: 11 Y: 9, [1,0] Pixels X: 34 Y: 9, ...
// function CreateCoordArray(){
//     let xR = 0, yR = 19;
//     let i = 0, j = 0;
//     for(let y = 9; y <= 446; y += 23){
//         // 12 * 23 = 276 - 12 = 264 Max X value
//         for(let x = 11; x <= 264; x += 23){
//             coordinateArray[i][j] = new Coordinates(x,y);
//             // console.log(i + ":" + j + " = " + coordinateArray[i][j].x + ":" + coordinateArray[i][j].y);
//             i++;
//         }
//         j++;
//         i = 0;
//     }
// }

// function SetupCanvas(){
//     canvas = document.getElementById('my-canvas');
//     ctx = canvas.getContext('2d');
//     canvas.width = 936;
//     canvas.height = 956;

//     // Double the size of elements to fit the screen
//     ctx.scale(2, 2);

//     // Draw Canvas background
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
//     // Draw gameboard rectangle
//     ctx.strokeStyle = 'black';
//     ctx.strokeRect(8, 8, 280, 462);

//     tetrisLogo = new Image(161, 54);
//     tetrisLogo.onload = DrawTetrisLogo;
//     tetrisLogo.src = "tetrislogo.png";

//     // Set font for score label text and draw
//     ctx.fillStyle = 'black';
//     ctx.font = '21px Arial';
//     ctx.fillText("SCORE", 300, 98);

//     // Draw score rectangle
//     ctx.strokeRect(300, 107, 161, 24);

//     // Draw score
//     ctx.fillText(score.toString(), 310, 127);
    
//     // Draw level label text
//     ctx.fillText("LEVEL", 300, 157);

//     // Draw level rectangle
//     ctx.strokeRect(300, 171, 161, 24);

//     // Draw level
//     ctx.fillText(level.toString(), 310, 190);

//     // Draw next label text
//     ctx.fillText("WIN / LOSE", 300, 221);

//     // Draw playing condition
//     ctx.fillText(winOrLose, 310, 261);

//     // Draw playing condition rectangle
//     ctx.strokeRect(300, 232, 161, 95);
    
//     // Draw controls label text
//     ctx.fillText("CONTROLS", 300, 354);

//     // Draw controls rectangle
//     ctx.strokeRect(300, 366, 161, 104);

//     // Draw controls text
//     ctx.font = '19px Arial';
//     ctx.fillText("A : Move Left", 310, 388);
//     ctx.fillText("D : Move Right", 310, 413);
//     ctx.fillText("S : Move Down", 310, 438);
//     ctx.fillText("E : Rotate Right", 310, 463);

//     // 2. Handle keyboard presses
//     document.addEventListener('keydown', HandleKeyPress);

//     // 3. Create the array of Tetromino arrays
//     CreateTetrominos();
//     // 3. Generate random Tetromino
//     CreateTetromino();

//     // Create the rectangle lookup table
//     CreateCoordArray();

//     DrawTetromino();
// }

// function DrawTetrisLogo(){
//     ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
// }

// function DrawTetromino(){
//     // Cycle through the x & y array for the tetromino looking
//     // for all the places a square would be drawn
//     for(let i = 0; i < curTetromino.length; i++){

//         // Move the Tetromino x & y values to the tetromino
//         // shows in the middle of the gameboard
//         let x = curTetromino[i][0] + startX;
//         let y = curTetromino[i][1] + startY;

//         // 4. Put Tetromino shape in the gameboard array
//         gameBoardArray[x][y] = 1;
//         // console.log("Put 1 at [" + x + "," + y + "]");

//         // Look for the x & y values in the lookup table
//         let coorX = coordinateArray[x][y].x;
//         let coorY = coordinateArray[x][y].y;

//         // console.log("X : " + x + " Y : " + y);
//         // console.log("Rect X : " + coordinateArray[x][y].x + " Rect Y : " + coordinateArray[x][y].y);

//         // 1. Draw a square at the x & y coordinates that the lookup
//         // table provides
//         ctx.fillStyle = curTetrominoColor;
//         ctx.fillRect(coorX, coorY, 21, 21);
//     }
// }

// // ----- 2. Move & Delete Old Tetrimino -----
// // Each time a key is pressed we change the either the starting
// // x or y value for where we want to draw the new Tetromino
// // We also delete the previously drawn shape and draw the new one
// function HandleKeyPress(key){
//     if(winOrLose != "Game Over"){
//     // a keycode (LEFT)
//     if(key.keyCode === 65){
//         // 4. Check if I'll hit the wall
//         direction = DIRECTION.LEFT;
//         if(!HittingTheWall() && !CheckForHorizontalCollision()){
//             DeleteTetromino();
//             startX--;
//             DrawTetromino();
//         } 

//     // d keycode (RIGHT)
//     } else if(key.keyCode === 68){
        
//         // 4. Check if I'll hit the wall
//         direction = DIRECTION.RIGHT;
//         if(!HittingTheWall() && !CheckForHorizontalCollision()){
//             DeleteTetromino();
//             startX++;
//             DrawTetromino();
//         }

//     // s keycode (DOWN)
//     } else if(key.keyCode === 83){
//         MoveTetrominoDown();
//         // 9. e keycode calls for rotation of Tetromino
//     } else if(key.keyCode === 69){
//         RotateTetromino();
//     }
//     } 
// }

// function MoveTetrominoDown(){
//     // 4. Track that I want to move down
//     direction = DIRECTION.DOWN;

//     // 5. Check for a vertical collision
//     if(!CheckForVerticalCollison()){
//         DeleteTetromino();
//         startY++;
//         DrawTetromino();
//     }
// }

// // 10. Automatically calls for a Tetromino to fall every second

// window.setInterval(function(){
//     if(winOrLose != "Game Over"){
//         MoveTetrominoDown();
//     }
//   }, 1000);


// // Clears the previously drawn Tetromino
// // Do the same stuff when we drew originally
// // but make the square white this time
// function DeleteTetromino(){
//     for(let i = 0; i < curTetromino.length; i++){
//         let x = curTetromino[i][0] + startX;
//         let y = curTetromino[i][1] + startY;

//         // 4. Delete Tetromino square from the gameboard array
//         gameBoardArray[x][y] = 0;

//         // Draw white where colored squares used to be
//         let coorX = coordinateArray[x][y].x;
//         let coorY = coordinateArray[x][y].y;
//         ctx.fillStyle = 'white';
//         ctx.fillRect(coorX, coorY, 21, 21);
//     }
// }

// // 3. Generate random Tetrominos with color
// // We'll define every index where there is a colored block
// function CreateTetrominos(){
//     // Push T 
//     tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
//     // Push I
//     tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
//     // Push J
//     tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
//     // Push Square
//     tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
//     // Push L
//     tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
//     // Push S
//     tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
//     // Push Z
//     tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
// }

// function CreateTetromino(){
//     // Get a random tetromino index
//     let randomTetromino = Math.floor(Math.random() * tetrominos.length);
//     // Set the one to draw
//     curTetromino = tetrominos[randomTetromino];
//     // Get the color for it
//     curTetrominoColor = tetrominoColors[randomTetromino];
// }

// // 4. Check if the Tetromino hits the wall
// // Cycle through the squares adding the upper left hand corner
// // position to see if the value is <= to 0 or >= 11
// // If they are also moving in a direction that would be off
// // the board stop movement
// function HittingTheWall(){
//     for(let i = 0; i < curTetromino.length; i++){
//         let newX = curTetromino[i][0] + startX;
//         if(newX <= 0 && direction === DIRECTION.LEFT){
//             return true;
//         } else if(newX >= 11 && direction === DIRECTION.RIGHT){
//             return true;
//         }  
//     }
//     return false;
// }

// // 5. Check for vertical collison
// function CheckForVerticalCollison(){
//     // Make a copy of the tetromino so that I can move a fake
//     // Tetromino and check for collisions before I move the real
//     // Tetromino
//     let tetrominoCopy = curTetromino;
//     // Will change values based on collisions
//     let collision = false;

//     // Cycle through all Tetromino squares
//     for(let i = 0; i < tetrominoCopy.length; i++){
//         // Get each square of the Tetromino and adjust the square
//         // position so I can check for collisions
//         let square = tetrominoCopy[i];
//         // Move into position based on the changing upper left
//         // hand corner of the entire Tetromino shape
//         let x = square[0] + startX;
//         let y = square[1] + startY;

//         // If I'm moving down increment y to check for a collison
//         if(direction === DIRECTION.DOWN){
//             y++;
//         }

//         // Check if I'm going to hit a previously set piece
//         // if(gameBoardArray[x][y+1] === 1){
//         if(typeof stoppedShapeArray[x][y+1] === 'string'){
//             // console.log("COLLISON x : " + x + " y : " + y);
//             // If so delete Tetromino
//             DeleteTetromino();
//             // Increment to put into place and draw
//             startY++;
//             DrawTetromino();
//             collision = true;
//             break;
//         }
//         if(y >= 20){
//             collision = true;
//             break;
//         }
//     }
//     if(collision){
//         // Check for game over and if so set game over text
//         if(startY <= 2){
//             winOrLose = "Game Over";
//             ctx.fillStyle = 'white';
//             ctx.fillRect(310, 242, 140, 30);
//             ctx.fillStyle = 'black';
//             ctx.fillText(winOrLose, 310, 261);
//         } else {

//             // 6. Add stopped Tetromino to stopped shape array
//             // so I can check for future collisions
//             for(let i = 0; i < tetrominoCopy.length; i++){
//                 let square = tetrominoCopy[i];
//                 let x = square[0] + startX;
//                 let y = square[1] + startY;
//                 // Add the current Tetromino color
//                 stoppedShapeArray[x][y] = curTetrominoColor;
//             }

//             // 7. Check for completed rows
//             CheckForCompletedRows();

//             CreateTetromino();

//             // Create the next Tetromino and draw it and reset direction
//             direction = DIRECTION.IDLE;
//             startX = 4;
//             startY = 0;
//             DrawTetromino();
//         }

//     }
// }

// // 6. Check for horizontal shape collision
// function CheckForHorizontalCollision(){
//     // Copy the Teromino so I can manipulate its x value
//     // and check if its new value would collide with
//     // a stopped Tetromino
//     var tetrominoCopy = curTetromino;
//     var collision = false;

//     // Cycle through all Tetromino squares
//     for(var i = 0; i < tetrominoCopy.length; i++)
//     {
//         // Get the square and move it into position using
//         // the upper left hand coordinates
//         var square = tetrominoCopy[i];
//         var x = square[0] + startX;
//         var y = square[1] + startY;

//         // Move Tetromino clone square into position based
//         // on direction moving
//         if (direction == DIRECTION.LEFT){
//             x--;
//         }else if (direction == DIRECTION.RIGHT){
//             x++;
//         }

//         // Get the potential stopped square that may exist
//         var stoppedShapeVal = stoppedShapeArray[x][y];

//         // If it is a string we know a stopped square is there
//         if (typeof stoppedShapeVal === 'string')
//         {
//             collision=true;
//             break;
//         }
//     }

//     return collision;
// }

// // 7. Check for completed rows
// // ***** SLIDE *****
// function CheckForCompletedRows(){

//     // 8. Track how many rows to delete and where to start deleting
//     let rowsToDelete = 0;
//     let startOfDeletion = 0;

//     // Check every row to see if it has been completed
//     for (let y = 0; y < gBArrayHeight; y++)
//     {
//         let completed = true;
//         // Cycle through x values
//         for(let x = 0; x < gBArrayWidth; x++)
//         {
//             // Get values stored in the stopped block array
//             let square = stoppedShapeArray[x][y];

//             // Check if nothing is there
//             if (square === 0 || (typeof square === 'undefined'))
//             {
//                 // If there is nothing there once then jump out
//                 // because the row isn't completed
//                 completed=false;
//                 break;
//             }
//         }

//         // If a row has been completed
//         if (completed)
//         {
//             // 8. Used to shift down the rows
//             if(startOfDeletion === 0) startOfDeletion = y;
//             rowsToDelete++;

//             // Delete the line everywhere
//             for(let i = 0; i < gBArrayWidth; i++)
//             {
//                 // Update the arrays by deleting previous squares
//                 stoppedShapeArray[i][y] = 0;
//                 gameBoardArray[i][y] = 0;
//                 // Look for the x & y values in the lookup table
//                 let coorX = coordinateArray[i][y].x;
//                 let coorY = coordinateArray[i][y].y;
//                 // Draw the square as white
//                 ctx.fillStyle = 'white';
//                 ctx.fillRect(coorX, coorY, 21, 21);
//             }
//         }
//     }
//     if(rowsToDelete > 0){
//         score += 10;
//         ctx.fillStyle = 'white';
//         ctx.fillRect(310, 109, 140, 19);
//         ctx.fillStyle = 'black';
//         ctx.fillText(score.toString(), 310, 127);
//         MoveAllRowsDown(rowsToDelete, startOfDeletion);
//     }
// }

// // 8. Move rows down after a row has been deleted
// function MoveAllRowsDown(rowsToDelete, startOfDeletion){
//     for (var i = startOfDeletion-1; i >= 0; i--)
//     {
//         for(var x = 0; x < gBArrayWidth; x++)
//         {
//             var y2 = i + rowsToDelete;
//             var square = stoppedShapeArray[x][i];
//             var nextSquare = stoppedShapeArray[x][y2];

//             if (typeof square === 'string')
//             {
//                 nextSquare = square;
//                 gameBoardArray[x][y2] = 1; // Put block into GBA
//                 stoppedShapeArray[x][y2] = square; // Draw color into stopped

//                 // Look for the x & y values in the lookup table
//                 let coorX = coordinateArray[x][y2].x;
//                 let coorY = coordinateArray[x][y2].y;
//                 ctx.fillStyle = nextSquare;
//                 ctx.fillRect(coorX, coorY, 21, 21);

//                 square = 0;
//                 gameBoardArray[x][i] = 0; // Clear the spot in GBA
//                 stoppedShapeArray[x][i] = 0; // Clear the spot in SSA
//                 coorX = coordinateArray[x][i].x;
//                 coorY = coordinateArray[x][i].y;
//                 ctx.fillStyle = 'white';
//                 ctx.fillRect(coorX, coorY, 21, 21);
//             }
//         }
//     }
// }

// // 9. Rotate the Tetromino
// // ***** SLIDE *****
// function RotateTetromino()
// {
//     let newRotation = new Array();
//     let tetrominoCopy = curTetromino;
//     let curTetrominoBU;

//     for(let i = 0; i < tetrominoCopy.length; i++)
//     {
//         // Here to handle a error with a backup Tetromino
//         // We are cloning the array otherwise it would 
//         // create a reference to the array that caused the error
//         curTetrominoBU = [...curTetromino];

//         // Find the new rotation by getting the x value of the
//         // last square of the Tetromino and then we orientate
//         // the others squares based on it [SLIDE]
//         let x = tetrominoCopy[i][0];
//         let y = tetrominoCopy[i][1];
//         let newX = (GetLastSquareX() - y);
//         let newY = x;
//         newRotation.push([newX, newY]);
//     }
//     DeleteTetromino();

//     // Try to draw the new Tetromino rotation
//     try{
//         curTetromino = newRotation;
//         DrawTetromino();
//     }  
//     // If there is an error get the backup Tetromino and
//     // draw it instead
//     catch (e){ 
//         if(e instanceof TypeError) {
//             curTetromino = curTetrominoBU;
//             DeleteTetromino();
//             DrawTetromino();
//         }
//     }
// }

// // Gets the x value for the last square in the Tetromino
// // so we can orientate all other squares using that as
// // a boundary. This simulates rotating the Tetromino
// function GetLastSquareX()
// {
//     let lastX = 0;
//      for(let i = 0; i < curTetromino.length; i++)
//     {
//         let square = curTetromino[i];
//         if (square[0] > lastX)
//             lastX = square[0];
//     }
//     return lastX;
// }





"use strict";
const OneFrameTime = 17;
const createDiv = (classList, children = []) => {
    const div = document.createElement("div");
    div.classList.add(...classList);
    children.forEach((ele) => {
        div.appendChild(ele);
    });
    return div;
};
const createElementNS = (name, attr) => {
    const xmlns = "http://www.w3.org/2000/svg";
    const elementNS = document.createElementNS(xmlns, name);
    Object.keys(attr).forEach((key) => {
        elementNS.setAttributeNS(null, key, attr[key]);
    });
    return elementNS;
};
class Marble {
    constructor({ color = `#ff2244` }) {
        this.ID = `${(~~(Math.random() * 1000000000))
            .toString(16)
            .toLocaleUpperCase()}`;
        this.DOM = createDiv(["marble"]);
        this.Color = color;
        this.DOM.style.backgroundColor = this.Color;
        this.DOM.style.width = `${Marble.Size}px`;
        this.DOM.style.height = `${Marble.Size}px`;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        if (this.DOM) {
            this.DOM.style.transform = `translate(calc(${this.x}px - 50%), calc(${this.y}px - 50%))`;
        }
        return this;
    }
    appendTo(parent) {
        this.parent = parent;
        parent.appendChild(this.DOM);
        return this;
    }
    remove() {
        if (!this.parent) {
            return this;
        }
        this.parent.removeChild(this.DOM);
        this.parent = null;
        return this;
    }
    overlap(marble) {
        let r = Marble.Size - Math.sqrt((this.x - marble.x) ** 2 + (this.y - marble.y) ** 2);
        return r;
    }
}
Marble.Size = 60;
class Player {
    constructor({ x = 0, y = 0 }) {
        this.Marble = createDiv(["marble-1"]);
        this.NextMarbleList = [
            createDiv(["marble-2"]),
            createDiv(["marble-2"]),
            createDiv(["marble-2"])
        ];
        this.DOM = createDiv(["player"], [this.Marble, ...this.NextMarbleList]);
        this.X = x;
        this.Y = y;
        this.DOM.style.transform = `translate(calc(${this.X}px - 50%), calc(${this.Y}px - 50%)) rotate(0deg)`;
    }
    lookAt(x, y) {
        if (!this.parent) {
            return this;
        }
        this.lookX = x;
        this.lookY = y;
        const rect = this.DOM.getBoundingClientRect();
        const innerX = rect.left + (rect.right - rect.left) / 2;
        const innerY = rect.top + (rect.bottom - rect.top) / 2;
        this.rotate =
            (Math.atan2(this.lookY - innerY, this.lookX - innerX) * 180) / Math.PI + 90;
        this.DOM.style.transform = `translate(calc(${this.X}px - 50%), calc(${this.Y}px - 50%)) rotate(${this.rotate}deg)`;
        return this;
    }
    appendTo(parent) {
        this.parent = parent;
        this.parent.appendChild(this.DOM);
        return this;
    }
    setMarbleColor(color) {
        this.Marble.style.backgroundColor = color;
        return this;
    }
    setNextMarbleColor(color) {
        this.NextMarbleList.forEach((dom) => {
            dom.style.backgroundColor = color;
        });
        return this;
    }
    getVector() {
        const innerRotate = this.rotate - 90;
        return {
            x: Math.cos((innerRotate * Math.PI) / 180) * 30,
            y: Math.sin((innerRotate * Math.PI) / 180) * 30
        };
    }
}
class Zuma {
    constructor(data) {
        this.AllMarbleLength = 100;
        this.InitMarbleLength = 20;
        this.Container = createDiv(["container"], [
            createDiv(["leaf", "leaf-01"]),
            createDiv(["leaf", "leaf-02"]),
            createDiv(["leaf", "leaf-03"]),
            createDiv(["leaf", "leaf-04"]),
            createDiv(["leaf", "leaf-05"]),
            createDiv(["leaf", "leaf-06"])
        ]);
        this.Path = createElementNS("path", {});
        this.moveSpeed = 4;
        this.autoAddMarbleCount = 0;
        this.marbleDataList = [];
        this.marbleBoomList = [];
        this.marbleColorCount = {};
        this.moveTimes = 0;
        this.isStart = false;
        this._isInit = false;
        this._isFinal = false;
        this.windowEventList = [];
        this.checkDeleteAfterTouchData = {};
        this.playerMarble = {
            now: null,
            next: null
        };
        this._score = 0;
        this.width = data.width;
        this.height = data.height;
        const svg = createElementNS("svg", {
            x: "0px",
            y: "0px",
            width: `${data.width}px`,
            height: `${data.height}px`,
            viewBox: `0 0 ${data.width} ${data.height}`
        });
        svg.appendChild(this.Path);
        this.Path.setAttributeNS(null, "d", data.path);
        this.PathLength = this.Path.getTotalLength();
        const startHolePos = this.Path.getPointAtLength(0);
        const finalHolePos = this.Path.getPointAtLength(this.PathLength);
        const startHole = createDiv(["start-hole"]);
        const finalHole = createDiv(["final-hole"]);
        startHole.style.left = `${startHolePos.x}px`;
        startHole.style.top = `${startHolePos.y}px`;
        finalHole.style.left = `${finalHolePos.x}px`;
        finalHole.style.top = `${finalHolePos.y}px`;
        this.Container.appendChild(startHole);
        this.Container.appendChild(finalHole);
        this.Container.style.width = `${data.width}px`;
        this.Container.style.height = `${data.height}px`;
        this.Container.style.transform = `scale(${data.scale || 1})`;
        this.Player = new Player(data.playerPos);
        this.Player.appendTo(this.Container);
        this.colorList = [...Zuma.DefaultColorList];
        this.colorList.forEach((color) => {
            this.marbleColorCount[color] = 0;
        });
        this.updateScore = data.updateScore;
        this.updateFinal = data.updateFinal;
    }
    get isInit() {
        return this._isInit;
    }
    set isFinal(isFinal) {
        this._isFinal = isFinal;
        this.updateFinal && this.updateFinal(this._isFinal);
    }
    get isFinal() {
        return this._isFinal;
    }
    set score(score) {
        this._score = score;
        this.updateScore && this.updateScore(this._score);
    }
    get score() {
        return this._score;
    }
    start() {
        this.isStart = true;
        this.time = new Date().getTime();
        if (!this.windowEventList.length) {
            this.bindEvent();
        }
        this.animation();
        return this;
    }
    stop() {
        this.isStart = false;
        return this;
    }
    reset() {
        this.isStart = false;
        this._isInit = false;
        this.isFinal = false;
        this.autoAddMarbleCount = 0;
        this.score = 0;
        this.moveSpeed = 4;
        this.colorList = [...Zuma.DefaultColorList];
        this.marbleDataList.forEach((d) => d.marble.remove());
        this.marbleBoomList.forEach((d) => d.marble.remove());
        this.marbleDataList.length = 0;
        this.marbleBoomList.length = 0;
        this.checkDeleteAfterTouchData = {};
        this.playerMarble.now = null;
        this.playerMarble.next = null;
        this.Player.setMarbleColor("").setNextMarbleColor("");
        Object.keys(this.marbleColorCount).forEach((color) => {
            this.marbleColorCount[color] = 0;
        });
        return this;
    }
    destroy() {
        this.reset();
        if (this.parent) {
            this.parent.removeChild(this.Container);
        }
        this.windowEventList.forEach((d) => {
            window.removeEventListener(d.name, d.fn);
        });
        this.windowEventList = [];
    }
    appendTo(parent) {
        this.parent = parent;
        this.parent.appendChild(this.Container);
        return this;
    }
    attack() {
        if (!this.Player || !this.playerMarble.now || !this.playerMarble.next) {
            return this;
        }
        const vector = this.Player.getVector();
        this.marbleBoomList.push({
            marble: this.playerMarble.now,
            speed: vector
        });
        this.playerMarble.now.appendTo(this.Container);
        this.playerMarble.now.setPosition(this.Player.X, this.Player.Y);
        this.playerMarble.now = this.playerMarble.next;
        this.playerMarble.next = this.createMarble();
        this.Player.setMarbleColor(this.playerMarble.now.Color).setNextMarbleColor(this.playerMarble.next.Color);
        return this;
    }
    init() {
        const innerTime = new Date().getTime();
        if (this.marbleDataList.length >= this.InitMarbleLength && this.isStart) {
            this._isInit = true;
            this.moveSpeed = 20;
            this.moveTimes = this.moveSpeed;
            this.playerMarble.now = this.createMarble();
            this.playerMarble.next = this.createMarble();
            this.Player.setMarbleColor(this.playerMarble.now.Color).setNextMarbleColor(this.playerMarble.next.Color);
            return this;
        }
        if (innerTime - this.time < OneFrameTime * 4) {
            return this;
        }
        this.time = innerTime;
        this.unshiftMarble();
        return this;
    }
    moveMoveMarbleData() {
        const firstMarble = this.marbleDataList[0];
        if (!firstMarble) {
            return;
        }
        if (firstMarble.percent >= 0.99) {
            this.score -= 1;
            this.removeMarbleFromDataList(firstMarble.marble);
        }
        const moveNum = Marble.Size / this.moveSpeed;
        firstMarble.percent += moveNum / this.PathLength;
        const pos = this.Path.getPointAtLength(firstMarble.percent * this.PathLength);
        firstMarble.marble.setPosition(pos.x, pos.y);
        let prevMarble = firstMarble;
        const deleteList = [];
        for (let i = 1; i < this.marbleDataList.length; i++) {
            const marbleData = this.marbleDataList[i];
            if (marbleData.percent >= 0.99) {
                this.score -= 1;
                this.removeMarbleFromDataList(marbleData.marble, i);
                continue;
            }
            const overlap = prevMarble.marble.overlap(marbleData.marble);
            if (overlap > 0 || prevMarble.percent > marbleData.percent) {
                // 檢查退回後修不需要刪除
                if (this.checkDeleteAfterTouchData[marbleData.marble.ID]) {
                    delete this.checkDeleteAfterTouchData[marbleData.marble.ID];
                    if (marbleData.marble.Color === prevMarble.marble.Color) {
                        const list = this.getNeerSameMarble(marbleData.marble);
                        if (list.length >= 3) {
                            deleteList.push(...list);
                        }
                    }
                }
                if (prevMarble.percent > marbleData.percent) {
                    marbleData.percent = prevMarble.percent + Marble.Size / this.PathLength;
                }
                else {
                    marbleData.percent += overlap / this.PathLength;
                }
            }
            else if (overlap < -5 && marbleData.percent > prevMarble.percent) {
                if (overlap < -Marble.Size) {
                    this.checkDeleteAfterTouchData[marbleData.marble.ID] = true;
                }
                const moveNum = (Marble.Size / this.moveSpeed) * 4;
                marbleData.percent -= moveNum / this.PathLength;
            }
            const pos = this.Path.getPointAtLength(marbleData.percent * this.PathLength);
            marbleData.marble.setPosition(pos.x, pos.y);
            prevMarble = marbleData;
        }
        deleteList.forEach((marble) => {
            this.score += 3;
            this.removeMarbleFromDataList(marble);
        });
    }
    moveMoveMarbleBoom() {
        if (!this.marbleBoomList.length) {
            return;
        }
        // TODO: 有空優化成分區檢測
        const marbleDataList = this.marbleDataList;
        const deleteData = [];
        this.marbleBoomList.forEach((data) => {
            data.marble.setPosition(data.marble.x + data.speed.x, data.marble.y + data.speed.y);
            for (let i = 0; i < marbleDataList.length; i++) {
                const marbleData = marbleDataList[i];
                const overlap = data.marble.overlap(marbleData.marble);
                if (overlap > 5) {
                    if (data.marble.Color === marbleData.marble.Color) {
                        const sameList = this.getNeerSameMarble(marbleData.marble);
                        if (sameList.length >= 2) {
                            this.score += sameList.length;
                            sameList.forEach((marble) => {
                                this.removeMarbleFromDataList(marble);
                            });
                            deleteData.push(Object.assign(Object.assign({}, data), { isMove: false }));
                            return;
                        }
                    }
                    this.addMarbleToNeer(data.marble, marbleData);
                    deleteData.push(Object.assign(Object.assign({}, data), { isMove: true }));
                    return;
                }
            }
            if (Math.abs(data.marble.x) > this.width ||
                Math.abs(data.marble.y) > this.height) {
                deleteData.push(Object.assign(Object.assign({}, data), { isMove: false }));
            }
        });
        deleteData.forEach((date) => {
            const index = this.marbleBoomList.findIndex((d) => d.marble.ID === date.marble.ID);
            this.marbleBoomList.splice(index, 1);
            if (!date.isMove) {
                date.marble.remove();
                this.marbleColorCount[date.marble.Color]--;
            }
        });
    }
    removeMarbleFromDataList(marble, index = this.marbleDataList.findIndex((d) => d.marble.ID === marble.ID)) {
        delete this.checkDeleteAfterTouchData[marble.ID];
        this.marbleDataList[index].marble.remove();
        this.marbleDataList.splice(index, 1);
        this.marbleColorCount[marble.Color]--;
        return this;
    }
    addMarbleToNeer(marble, target) {
        const index = this.marbleDataList.findIndex((d) => d.marble.ID === target.marble.ID);
        const prevPos = this.Path.getPointAtLength((target.percent - Marble.Size / this.PathLength) * this.PathLength);
        const nextPos = this.Path.getPointAtLength((target.percent + Marble.Size / this.PathLength) * this.PathLength);
        const prevGap = (prevPos.x - marble.x) ** 2 + (prevPos.y - marble.y) ** 2;
        const nextGap = (nextPos.x - marble.x) ** 2 + (nextPos.y - marble.y) ** 2;
        if (prevGap < nextGap) {
            this.marbleDataList.splice(index - 1, 0, {
                marble,
                percent: target.percent - Marble.Size / this.PathLength / 2
            });
        }
        else {
            this.marbleDataList.splice(index, 0, {
                marble,
                percent: target.percent + Marble.Size / this.PathLength / 2
            });
        }
        return this;
    }
    createMarble() {
        const marble = new Marble({ color: this.getColor() });
        this.marbleColorCount[marble.Color]++;
        return marble;
    }
    unshiftMarble() {
        const marble = this.createMarble();
        marble.appendTo(this.Container);
        this.marbleDataList.unshift({
            marble,
            percent: 0
        });
        this.autoAddMarbleCount++;
        return this;
    }
    getColor() {
        const index = ~~(Math.random() * this.colorList.length);
        const color = this.colorList[index];
        if (this.marbleColorCount[color] ||
            this.colorList.length === 1 ||
            !this.isInit) {
            return color;
        }
        this.colorList.splice(index, 1);
        return this.getColor();
    }
    getNeerSameMarble(marble) {
        let checkMarble;
        const index = this.marbleDataList.findIndex((ele) => ele.marble.ID === marble.ID);
        const neerList = [marble];
        checkMarble = marble;
        for (let i = index + 1; i < this.marbleDataList.length; i++) {
            const nowMarble = this.marbleDataList[i].marble;
            if (nowMarble.Color === checkMarble.Color &&
                nowMarble.overlap(checkMarble) > Marble.Size / -10) {
                checkMarble = nowMarble;
                neerList.push(nowMarble);
            }
            else {
                break;
            }
        }
        checkMarble = marble;
        for (let i = index - 1; i >= 0; i--) {
            const nowMarble = this.marbleDataList[i].marble;
            if (nowMarble.Color === checkMarble.Color &&
                nowMarble.overlap(checkMarble) > Marble.Size / -10) {
                checkMarble = nowMarble;
                neerList.push(nowMarble);
            }
            else {
                break;
            }
        }
        return neerList;
    }
    animation() {
        if (!this.isStart) {
            return;
        }
        requestAnimationFrame(() => this.animation());
        if (!this.isInit) {
            this.init().moveMoveMarbleData();
            return;
        }
        const innerTime = new Date().getTime();
        if (innerTime - this.time < OneFrameTime) {
            return;
        }
        this.time = innerTime;
        if (this.moveTimes === this.moveSpeed &&
            this.autoAddMarbleCount < this.AllMarbleLength) {
            this.unshiftMarble();
            this.moveTimes = 0;
        }
        this.moveMoveMarbleBoom();
        this.moveMoveMarbleData();
        this.moveTimes++;
        if (this.marbleDataList.length === 0) {
            this.isFinal = true;
        }
    }
    bindEvent() {
        const mousemove = (e) => {
            if (!this.Player) {
                return;
            }
            this.Player.lookAt(e.pageX, e.pageY);
        };
        const click = (e) => {
            if (!this.isStart || this.isFinal || !this.isInit) {
                return;
            }
            this.attack();
            if (e.button === 1) {
            }
        };
        const keydown = (e) => {
            if (!this.isStart || this.isFinal || !this.isInit) {
                return;
            }
            if (e.code === "Space") {
                e.preventDefault();
                if (this.Player && this.playerMarble.now && this.playerMarble.next) {
                    [this.playerMarble.now, this.playerMarble.next] = [
                        this.playerMarble.next,
                        this.playerMarble.now
                    ];
                    this.Player.setMarbleColor(this.playerMarble.now.Color).setNextMarbleColor(this.playerMarble.next.Color);
                }
            }
        };
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("click", click);
        window.addEventListener("keydown", keydown);
        this.windowEventList.push({ name: "mousemove", fn: mousemove }, { name: "click", fn: click }, { name: "keydown", fn: keydown });
    }
}
Zuma.DefaultColorList = [
    "#0C3406",
    "#077187",
    "#74A57F",
    "#ABD8CE",
    "#E4C5AF"
];
window.onload = () => {
    const scoreDOM = document.body.querySelector("#score .num");
    const startPopup = document.body.querySelector("#start");
    const stopPopup = document.body.querySelector("#stop");
    const finalPopup = document.body.querySelector("#final");
    const finalNum = finalPopup.querySelector(".num");
    const zumaGame = new Zuma({
        width: 1200,
        height: 800,
        scale: 0.7,
        path: `M235.5-36.5c0,0-129,157.858-143,381.918c-6.6,105.632,47,236.043,159,295.679s338.566,101.881,547,64.404
    c199-35.781,312.016-164.676,313-266c1-103-34-221.816-200-278.044c-142.542-48.282-346.846-37.455-471,31.044
    c-116,64-154.263,213.533-81,304.619c92,114.381,410,116.381,476,2.891c62.975-108.289-40-203.51-158-206.51`,
        playerPos: { x: 550, y: 400 },
        updateScore: (score) => {
            scoreDOM.innerHTML = `${score}`;
        },
        updateFinal: (isFinal) => {
            if (isFinal) {
                finalPopup.classList.add("active");
                finalNum.innerHTML = `${zumaGame.score}`;
            }
        }
    });
    zumaGame.appendTo(document.body);
    startPopup.querySelector(".button").addEventListener("click", () => {
        startPopup.classList.remove("active");
        zumaGame.start();
    });
    stopPopup.querySelector("#start-btn").addEventListener("click", () => {
        stopPopup.classList.remove("active");
        setTimeout(() => {
            zumaGame.start();
        }, 100);
    });
    stopPopup.querySelector("#reset-btn").addEventListener("click", () => {
        stopPopup.classList.remove("active");
        zumaGame.reset().start();
    });
    finalPopup.querySelector(".button").addEventListener("click", () => {
        finalPopup.classList.remove("active");
        zumaGame.reset().start();
    });
    window.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && zumaGame.isInit) {
            zumaGame.stop();
            stopPopup.classList.add("active");
        }
    });
    window.addEventListener("blur", function (e) {
        if (zumaGame.isInit && !zumaGame.isFinal) {
            zumaGame.stop();
            stopPopup.classList.add("active");
        }
    });
};