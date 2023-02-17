var targetX, targetY, startX, startY;
var bullet;

class Bullet{    
    constructor(){
        targetX = mouseX;
        targetY = mouseY;
        startX = player.x;
        startY = player.y;

        //sprite
        bullet=createSprite(startX,startY,windowWidth/10,windowWidth/10);
        bullet.addAnimation("shoot", bulletI);
        bullet.scale = windowWidth/10000;
        bullet.setCollider("circle",0,0,windowWidth/15);
    }

    display(){
        bullet.debug=true;
        //algorithm
        if(bullet.x>targetX){
            bullet.velocityX=-2;
        }
        else{
            bullet.velocityX=2;
        }
        if(bullet.y>targetY){
            bullet.velocityY=-2;
        }
        else{
            bullet.velocityY=2;;
        }

        //damaging
        if(bullet.isTouching(boss))
        {
            health-=5;
        }

        bullet.lifetime=400;
    }
}