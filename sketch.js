var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,500);
  monkey = createSprite(100, 400, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(250, 425, 500, 10);
  ground.velocityX = -3;
  
  score = 0;
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");

  if(ground.x >0) {
    ground.x = ground.width/2;
  } 
  
  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
  text("SCORE:" + score, 400,25);
  
  if(gameState === PLAY) {
    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 2;
    }
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
    
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
  if (gameState === END) {
      ground.setVelocityX = 0;
      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      text("GAME OVER",200,200);
  }
}


function spawnBanana() {
  if(World.frameCount % 80 === 0) {
    banana = createSprite(500, 225, 10, 10);
    banana.y = random(150, 250);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}
function spawnObstacle() {
  if(World.frameCount % 150 === 0) {
    obstacle = createSprite(500, 400, 20, 20);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}




