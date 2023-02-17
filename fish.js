var targetX, startX;
var bullet;

class Fish{    
    constructor(){
        startX = boss.x;
        targetX = player.x;

        //sprite
        bullet=createSprite(startX,player.y,windowWidth/10,windowWidth/10);
        bullet.addAnimation("shoot", bulletI);
        bullet.scale = windowWidth/10000;
        bullet.setCollider("circle",0,0,windowWidth/15);
    }

    display(){
        //algorithm
        if(bullet.x>targetX){
            bullet.velocityX=-2;
        }
        else{
            bullet.velocityX=2;
        }

        //damaging
        if(bullet.isTouching(player))
        {
            playerHealth-=damage;
        }

        bullet.lifetime=400;
    }
}