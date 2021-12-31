import * as dom from "./DomManipulation.js";
import * as clib from "./BlockClass.js";
import * as util from "./utils.js";

document.addEventListener("readystatechange", (event) =>{
    if(event.target.readyState === "complete"){
        console.log("readyState: complete");
        initApp();
    }
});

const initApp = () =>
{
    const btnReplay = dom.getEl.gEID("btnReplay");
    const btnQuit = dom.getEl.gEID("btnQuit");
    const body = dom.getEl.gETN("body", 0);
    const main = dom.getEl.gETN("main", 0);
    dom.Event.listen(btnReplay, "click", function(){replay();});
    dom.Event.listen(btnQuit, "click", function (){quit();});
    startGame(body);
    dom.Event.listen(main, "click", function(){playGame();});
}

const replay = () =>
{
    const confirm = window.confirm("Would you like to replay?");
    if(confirm){
        location.reload();
    }
};

const quit = () =>
{
    const confirm = window.confirm("Would you like to quit?");
    if(confirm){
        window.close();
    }
};


    const main = dom.getEl.gETN("main", 0);
    const body = dom.getEl.gETN("body", 0);
    const paddle = new clib.paddle();
    const gameBorder = new clib.gameBorder();
    const ball = new clib.ball();
    let lives = parseInt(dom.getEl.gETN("h4", 0).innerHTML);
    const message = dom.getEl.gETN("p", 0);
    let brick1 = new clib.brick(1);
    let brick2 = new clib.brick(2);
    let brick3 = new clib.brick(3);
    let brick4 = new clib.brick(4);
    let brick5 = new clib.brick(5);
    let brick6 = new clib.brick(6);
    let brick7 = new clib.brick(7);
    let brick8, brick9, brick10, brick11;
    let brick12, brick13, brick14, brick15, brick16, brick17, brick18, brick19, brick20;
    let init = true;
    
    const playGame = () =>
    {
        removeStart(body);
        dom.Event.removeEvent(main, "click", playGame);
        dom.Event.listen(main, "mousemove", function(e){movePaddleMouse(e);});
        dom.Event.listen(body, "keydown", function(event){movePaddleKeys(event);});
        brickInit(init);
        message.innerHTML = "Use the mouse or left and right arrow keys to move the paddle and clear all the bricks.";
        const ballChange = setInterval(function(){ballMove(ballChange);}, 20);
        gameOver();
    };

    const startGame = (body) =>
    {
        dom.Event.listen(body, "keydown", function(event){
            const key = event.key;
            if(key === "Enter"){
                playGame();
            }
        });
    };

    const brickInit = () =>
    {
        if(init){
            brick1.initialize();
            brick2.initialize();
            brick3.initialize();
            brick4.initialize();
            brick5.initialize();
            brick6.initialize();
            brick7.initialize();/*
            brickPopulate(brick8, 8);
            brickPopulate(brick9, 9);
            brickPopulate(brick10, 10);
            brickPopulate(brick11, 11);
            brickPopulate(brick12, 12);
            brickPopulate(brick13, 13);
            brickPopulate(brick14, 14);
            brickPopulate(brick15, 15);
            brickPopulate(brick16, 16);
            brickPopulate(brick17, 17);
            brickPopulate(brick18, 18);
            brickPopulate(brick19, 19);
            brickPopulate(brick20, 20);*/
            init = false;
            }
    }

    const brickPopulate = (brick, i) =>
    {
        //brick = new clib.brick(i);
        brick.initialize();
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

    const removeStart = (body) =>
    {
        dom.Event.removeEvent(body, "keydown", function(event){
            const key = event.key;
            if(key === "Enter"){
                playGame();
            }
        });
    };

    const LifeUpdate = () =>
    {
        lives = lives - 1;
        dom.getEl.gETN("h4", 0).innerHTML = lives;
    };

    const gameOver = () =>
    {
        if(lives === 0)
        {
            message.innerHTML = "Game Over!";
            replay();
        }
    };

    const ScoreUpdate = () =>
    {
        let score = parseInt(dom.getEl.gETN("h4", 1).innerHTML);
        score = score + 1;
        dom.getEl.gETN("h4", 1).innerHTML = score;
    };

    const ballMove = (ballChange) =>
    {
        checkCollision(ballChange);
        ball.setY(ball.getTop());
        ball.setX(ball.getLeft());
        ball.move();
    };

    const checkCollision = (ballChange) =>
    {
        onCollision(gameBorder, ballChange);
        onCollision(paddle);
        onBrickCollide(brick1);
        /*onBrickCollide(brick2);
        onBrickCollide(brick3);
        onBrickCollide(brick4);
        onBrickCollide(brick5);
        onBrickCollide(brick6);
        onBrickCollide(brick7);
        onBrickCollide(brick8);
        onBrickCollide(brick9);
        onBrickCollide(brick10);
        onBrickCollide(brick11);
        onBrickCollide(brick12);
        onBrickCollide(brick13);
        onBrickCollide(brick14);
        onBrickCollide(brick15);
        onBrickCollide(brick16);
        onBrickCollide(brick17);
        onBrickCollide(brick18);
        onBrickCollide(brick19);
        onBrickCollide(brick20);*/
    };

    const onCollision = (target, ballChange) =>
    {
        if(target != gameBorder){
            if(ball.getRight() > target.getLeft() && ball.getLeft() < target.getRight()){
                if(ball.getTop() < target.getBottom() && ball.getBottom() > target.getTop()){
                    ball.setDirY(-1 * ball.getDirY());
                    return true;
                } else if((ball.getTop() < target.getBottom() && ball.getBottom() > target.getTop())){
                    if(ball.getRight() > target.getLeft() && ball.getLeft() < target.getRight()){
                        ball.setDirX(-1 * ball.getDirX());
                        return true;
                    }
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
                ball.setX(147);
                ball.setY(510);
                ball.move();
                LifeUpdate();
                startGame(body);
            }
        }
    };

    const onBrickCollide = (brick) =>
    {
        if(onCollision(brick)){
            brick.onHit();
            if(brick.onHit() === undefined){
                brick = null;
            }
            ScoreUpdate();
        }
        
    };
