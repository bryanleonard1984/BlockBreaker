import * as dom from "./DomManipulation.js";
import * as clib from "./BlockClass.js";

document.addEventListener("readystatechange", (event) =>{
    if(event.target.readyState === "complete"){
        console.log("readyState: complete");
        initApp();
    }
});

const main = dom.getEl.gETN("main", 0);
const body = dom.getEl.gETN("body", 0);
const paddle = new clib.paddle();
const gameBorder = new clib.gameBorder();
const ball = new clib.ball();
let lives = parseInt(dom.getEl.gETN("h4", 0).innerHTML);
const message = dom.getEl.gETN("p", 0);
const bricks = [];
let init = true;
const start = function(event){startGame(event);};
const movePM = function(e){movePaddleMouse(e);};
const movePK = function(event){movePaddleKeys(event);};

const ballMove = (ballChange) =>
{
    checkCollision(ballChange);
    ball.setY(ball.getTop());
    ball.setX(ball.getLeft());
    ball.move();
};

const brickPopulate = (init) =>
{
    if(init){
        for(let i = 1; i < 21; i++){
            const brick = new clib.brick(i);
            brick.initialize();
            bricks.push(brick);
        }
        init = false;
    }
};

const checkCollision = (ballChange) =>
{
    onCollision(gameBorder, ballChange);
    onCollision(paddle);
    for(let i = 0; i < bricks.length; i++){
        onBrickCollide(bricks[i], i);
        if(bricks.length === 0){
            victory();
            clearInterval(ballChange);
            dom.Event.remove(main, "mousemove", movePM);
            dom.Event.remove(body, "keydown", movePK);
        }
    }
};

const gameOver = () =>
{
    if(lives < 1)
    {
        message.innerHTML = "Game Over! Click the replay button to play again.";
        dom.Event.remove(main, "mousemove", movePM);
        dom.Event.remove(body, "keydown", movePK);
        return true;
    } else {
        return false;
    }
};

const initApp = () =>
{
    const btnReplay = dom.getEl.gEID("btnReplay");
    const btnQuit = dom.getEl.gEID("btnQuit");
    dom.Event.listen(btnReplay, "click", replay);
    dom.Event.listen(btnQuit, "click", quit);
    dom.Event.listen(body, "keydown", start);
    dom.Event.listen(main, "click", playGame);
    console.log("Initialization: Complete");
}

const LifeUpdate = () =>
{
    lives = lives - 1;
    dom.getEl.gETN("h4", 0).innerHTML = lives;
};

const movePaddleKeys = (event) =>
{
    let key = event.key;
    if((key === "ArrowLeft") && (paddle.getLeft() > 10)){
        paddle.setX(paddle.getLeft() - 10);
    } else if((key === "ArrowRight") && (paddle.getRight() < 308)){
        paddle.setX(paddle.getLeft() + 10);
    }
    paddle.move();
};

const movePaddleMouse = (e) =>
{
    let x = e.clientX;
    if(x > 8 && x < (308 - paddle.getWidth())){
        paddle.setX(x);
    }    
    paddle.move();
};

const onBrickCollide = (brick, i) =>
{
    if(onCollision(brick)){
        if(brick.willBreak()){
            brick.onDestroy();
            bricks.splice(i, 1);
            ScoreUpdate();
        } else {
            brick.onHit();
            ScoreUpdate();
        }
    }
};

const onCollision = (target, ballChange) =>
{
    if(target != gameBorder){
        if(ball.getRight() > target.getLeft() && ball.getLeft() < target.getRight()){
            if(ball.getTop() < target.getBottom() && ball.getBottom() > target.getTop()){
                ball.setDirY(-1 * ball.getDirY());
                return true;
            }
        } else if((ball.getTop() < target.getBottom() && ball.getBottom() > target.getTop()))
        {
            if(ball.getRight() > target.getLeft() && ball.getLeft() < target.getRight()){
                ball.setDirX(-1 * ball.getDirX());
                return true;
            }
        }
    } else {
        if(ball.getTop() <= gameBorder.getTop())
        {
            ball.setDirY(ball.getDirY() * -1);
        }
        if((ball.getLeft() <= gameBorder.getLeft()) || (ball.getRight() >= gameBorder.getRight()))
        {
            ball.setDirX(ball.getDirX() * -1);
        }
        if(ball.getBottom() >= gameBorder.getBottom())
        {
            clearInterval(ballChange);
            dom.Event.remove(main, "mousemove", movePM);
            dom.Event.remove(body, "keydown", movePK);
            dom.Event.listen(main, "click", playGame);
            dom.Event.listen(body, "keydown", start);
            paddle.moveStart();
            ball.moveStart();
            LifeUpdate();
        }
    }
};

const playGame = () =>
{
    if(gameOver())
    {
        alert("Sorry, the game is over. Please click Replay to play again.");
    } else {
        dom.Event.remove(main, "click", playGame);
        dom.Event.remove(body, "keydown", start);
        dom.Event.listen(main, "mousemove", movePM);
        dom.Event.listen(body, "keydown", movePK);
        brickPopulate(init);
        message.innerHTML = "Use the mouse or left and right arrow keys to move the paddle and clear all the bricks.";
        const ballChange = setInterval(function(){ballMove(ballChange);
            gameOver();}, 20);
        
}};

const quit = () =>
{
    const confirm = window.confirm("Would you like to quit?");
    if(confirm){
        window.close();
    }
};

const replay = () =>
{
    const confirm = window.confirm("Would you like to replay?");
    if(confirm){
        location.reload();
    }
};

const ScoreUpdate = () =>
{
    let score = parseInt(dom.getEl.gETN("h4", 1).innerHTML);
    score = score + 1;
    dom.getEl.gETN("h4", 1).innerHTML = score;    
};

const startGame = (event) =>
{
    const key = event.key;
    if(key === "Enter"){
        playGame();
    }
};

const victory = () =>
    {
        score = score * (1 + (lives/10));
        dom.getEl.gETN("h4", 1).innerHTML = score;
        message.innerHTML = ("Congratulations, you broke all of the bricks! Click Replay to play again.");
    };