class InfiniBoss{    
    constructor(){
        //variables
        speed = 3;
        health = 100;
        damage = 5;
        delay = 30;

        //sprite
        boss=createSprite(windowWidth,windowHeight/2,windowWidth/10,windowWidth/10);
        boss.addAnimation("moving", sharkImage);
        boss.scale = windowWidth/3000;
        boss.setCollider("rectangle",0,-windowHeight/5,windowWidth/2,windowHeight/1.75);
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
            if(timer%delay === 0){
                playerHealth-=damage*2;
            }
        }
    }
    death(){
        boss.visible=false;
    }
}