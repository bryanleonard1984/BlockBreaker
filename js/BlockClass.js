export class ball {
    //obj = document.getElementById("ball");
    width = 15;
    height = 15;
    constructor (){
        this.left = 147;
        this.top = 510;
        this.right = 147 + this.width;
        this.bottom = 510 + this.height;
        this.dirX = -2;
        this.dirY = -2;
        this.obj = document.getElementById("ball");
    }
    
    setX(X){
        this.left = X + this.dirX;
        this.right = X + this.dirX + this.width;
    }

    setY(Y){
        this.top = Y + this.dirY;
        this.bottom = Y + this.height + this.dirY;
    }

    setDirX(dX){
        this.dirX = dX;
    }

    setDirY(dY){
        this.dirY = dY;
    }

    getTop(){
        return this.top;
    }

    getLeft(){
        return this.left;
    }

    getBottom(){
        return this.bottom;
    }

    getRight(){
        return this.right;
    }

    getDirX(){
        return this.dirX;
    }

    getDirY(){
        return this.dirY;
    }

    getObj(){
        return this.obj;
    }

    move(){
        this.obj.style.top = `${this.top}px`;
        this.obj.style.left = `${this.left}px`;
    }
}

export class paddle {
    width = 70;
    height = 15;
    constructor(){
        this.left = 119;
        this.top = 535;
        this.right = 119 + this.width;
        this.bottom = 535 + this.height;
        this.obj = document.getElementById("paddle");
    }

    setX(X){
        this.left = X;
        this.right = X + this.width;
    }

    getLeft(){
        return this.left;
    }

    getTop(){
        return this.top;
    }

    getRight(){
        return this.right;
    }

    getBottom(){
        return this.bottom;
    }

    getWidth(){
        return this.width;
    }

    move(){
        this.obj.style.left = `${this.left}px`;
        this.obj.style.top = `${this.top}px`;
    }
}

export class brick {
    width = 60;
    height = 30;
    
    constructor(i){
        this.color = [["", ""], ["hsl(0, 70%, 45%)", "hsl(0, 85%, 30%)"], ["hsl(45, 70%, 45%)", "hsl(45, 85%, 30%)"], 
        ["hsl(135, 70%, 45%)", "hsl(135, 85%, 30%)"], ["hsl(225, 70%, 45%)", "hsl(225, 85%, 30%)"]];
        this.hitPoints;
        this.left;
        this.top;
        this.right;
        this.bottom;
        this.obj = document.getElementById(`brick${i}`);
        this.objClass;
    }

    initialize(){
        this.left = this.obj.getBoundingClientRect().left;
        this.top = this.obj.getBoundingClientRect().top;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.objClass = this.obj.className;
        switch(this.objClass){
            case "r4brick":
                this.hitPoints = 1;
                break;
            case "r3brick":
                this.hitPoints = 2;
                break;
            case "r2brick":
                this.hitPoints = 3;
                break;
            case "r1brick":
                this.hitPoints = 4;
                break;
            default:
                break;
        }        
    }

    getLeft(){
        return this.left;
    }

    getTop(){
        return this.top;
    }

    getRight(){
        return this.right;
    }

    getBottom(){
        return this.bottom;
    }

    willBreak(){
        if(this.hitPoints === 1){
            return true;
        } else if(this.hitPoints > 1){
            return false;
        }
    }

    onHit(){        
        this.hitPoints = this.hitPoints - 1;
        this.obj.style.backgroundColor = this.color[this.hitPoints][0];
        this.obj.style.borderColor = this.color[this.hitPoints][1];
    }

    onDestroy(){
        this.hitPoints = this.hitPoints - 1;
        this.obj.style.display = "none";
    }
}

export class gameBorder {
    constructor(){
        this.top = 75;
        this.left = 8;
        this.right = 308;
        this.bottom = 575;
    }
    
    getTop(){
        return this.top;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }

    getBottom(){
        return this.bottom;
    }
}