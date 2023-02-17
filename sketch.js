var player, ground, playerI, bg, bgI, title, titleI;
var playerHealth = 100;
var speed, health, damage, delay;
var boss;
var boss1, boss2, boss3, boss4;
var timer = 0;
var restart = true;
var roboImage, roboDeath, roboAttack;
var logo, logoI;
var bulletI;
var shoot;
var score = 0;
var home = 1;

function preload() {
  logoI = loadAnimation("logo0.png", "logo1.png", "logo2.png", "logo3.png", "logo4.png", "logo4.png", "logo2.png", "logo1.png", "logo3.png", "logo2.png", "logo3.png", "logo4.png", "logo1.png", "logo0.png", "logo1.png", "logo4.png");
  bgI = loadAnimation("crash2.png", "crash.png", "crash.png");
  titleI = loadImage("title.png");
  playerI = loadAnimation("player1.png", "player2.png");

  bulletI = loadAnimation("bullet1.png", "bullet1.png");

  roboImage = loadAnimation("robo1.png", "robo2.png", "robo1.png", "robo3.png");
  sharkImage = loadAnimation("shark.png");
  roboDeath = loadAnimation("robodeath.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(windowWidth / 2, windowHeight / 2, windowWidth / 15, windowHeight / 15);
  bg.addAnimation("bg", bgI);
  bg.scale = windowWidth / 2000;

  logo = createSprite(windowWidth * 9 / 10, windowHeight / 10, windowWidth / 15, windowHeight / 15);
  logo.addAnimation("glitch", logoI);
  logo.scale = windowWidth / 10000;

  attack = createSprite(windowWidth / 10, windowHeight / 2, windowWidth / 15, windowHeight / 15);
  attack.addAnimation("player", bulletI);
  attack.scale = windowWidth / 1000;
  attack.setCollider("circle", windowWidth / 50, 0, windowWidth / 17);

  player = createSprite(windowWidth / 10, windowHeight / 2, windowWidth / 15, windowHeight / 15);
  player.addAnimation("player", playerI);
  player.scale = windowWidth / 10000;
  player.setCollider("rectangle", 0, 0, windowWidth / 2.2, windowHeight * 1.5);



  ground = createSprite(windowWidth / 2, windowHeight, windowWidth, windowHeight / 15);

  boss1 = new InfiniBoss();

  title = createSprite(windowWidth / 2, windowHeight / 2, windowWidth / 15, windowHeight / 15);
  title.addImage(titleI);
  title.scale = windowWidth / 2500;
}

function draw() {
  background(0, 0, 255);

  if (home === 1) {
     background(0, 255, 255);
     fill(200, 0, 0);
     textSize(100);
     text("Arrow keys to move\nDown to attack\n-you can't move while attacking\n\nClick to start", windowWidth / 15, windowHeight / 5)
     if (mouseIsPressed) {
      home = 0;
    }
  }
  else {
    title.visible=false;
    timer++;
    // console.log(timer);
    console.log(health);

    player.velocityY = 4;//gravity
    player.bounce(ground);
    ground.y = windowHeight;

    attack.x = player.x - windowWidth / 30;
    attack.y = player.y;
    attack.visible = false;

    //controls
    if (keyDown("down") && playerHealth > 0) {
      attack.visible = true;
      if (attack.isTouching(boss)) {
        health -= 1;
      }
    }
    else if (keyDown("left") && player.x > 0) {
      player.x -= 5;
    }
    else if (keyDown("right") && player.x < windowWidth) {
      player.x += 5;
    }
    if ((keyDown(" ") || keyDown("up")) && player.isTouching(ground)) {
      player.y -= windowHeight / 10;
    }


    //death
    if (playerHealth <= 0) {
      background(0, 0, 0);
      player.visible = false;
      boss.visible = false;
      bg.visible = false;
      playerHealth = 0;
      fill(200, 0, 0);
      textSize(200);
      text("GAME OVER", windowWidth / 15, windowHeight / 1.5)

    }

    //creating boss
    if (health > 0) {
      boss1.display();
    }
    else {
      boss1.death();
      pickBoss();
      score++;
    }

    drawSprites();

    //displaying health
    fill(0, 150, 0);
    textSize(100);
    text("Health: " + playerHealth + "\nScore: " + score, windowWidth / 15, windowHeight / 5);
  }
}

pickBoss = function () {
  if (score % 2 == 0)
    boss1 = new RoboBoss();
  else
    boss1 = new InfiniBoss();
  boss1.display();
}
