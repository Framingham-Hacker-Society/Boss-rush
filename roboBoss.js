class RoboBoss{    
    constructor(){
        //variables
        speed = 1;
        health = 150;
        damage = 20;
        delay = 40;

        //sprite
        boss=createSprite(windowWidth,windowHeight/2,windowWidth/10,windowWidth/10);
        boss.addAnimation("moving", roboImage);
        boss.scale = windowWidth/5000;
        boss.setCollider("rectangle",windowWidth/10,0,windowWidth/1.5,windowHeight*1.75);
    }

    display(){
        boss.visible = true;
        //gravity
        boss.velocityY=4;
        boss.bounce(ground);

        //chasing
        if(player.x>boss.x){
            boss.x+=speed;
        }
        else if(player.x<boss.x){
            boss.x-=speed;
        }

        //attacking
        if(boss.isTouching(player)){
            if(restart === true){//restarts attack timer whenever player touches boss
                timer = 1;
                restart = false;
            }
            if(timer%delay === 0){
                playerHealth-=damage;
            }
        }
        else{
            restart = true;
        }
    }
    death(){
        boss.visible=false;
    }
}