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
    const bricks = [];
    let init = true;
    
    const playGame = () =>
    {
        removeStart(body);
        dom.Event.removeEvent(main, "click", playGame);
        dom.Event.listen(main, "mousemove", function(e){movePaddleMouse(e);});
        dom.Event.listen(body, "keydown", function(event){movePaddleKeys(event);});
        brickPopulate(init);
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
        const victory = () => 
        {
            score = score * (1 + (lives/10));
            dom.getEl.gETN("h4", 1).innerHTML = score;
            message.innerHTML("Congratulations, you broke all of the bricks! Click Replay to play again.");
        }
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
        for(let i = 0; i < bricks.length; i++){
            onBrickCollide(bricks[i], i);
            if(bricks.length === 0){
                ScoreUpdate.victory();
                clearInterval(ballChange);
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

    const onBrickCollide = (brick, i) =>
    {
        if(onCollision(brick)){
            if(brick.willBreak()){
                util.log(brick);
                brick.onDestroy();
                util.log(brick);
                bricks.splice(i, 1);
                ScoreUpdate();
            } else {
                brick.onHit();
                ScoreUpdate();
            }
        }
    };
