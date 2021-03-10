var monkey , monkey_running, deadMonkeyImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground, PLAY, gameState;
var END = 0
var survivalTime=0

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  deadMonkeyImage=loadImage("sprite_8.png");
}


function setup() {
  
  monkey=createSprite(40,365,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.13;
  
  
  ground=createSprite(0,399,1500,15);

  
  FoodGroup = createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  createCanvas(700,400);
  background(rgb(33, 114, 73, 0.7));
  
ground.velocityX=-7;
ground.x=ground.width/2;
ground.shapeColor=rgb(16, 54, 16);
  
  stroke("white")
  textSize(10)
  fill(rgb(255, 255, 255))
  text("S C O R E :   "+survivalTime,300,50);
  survivalTime=Math.ceil(frameCount/frameRate())
  
  if (keyDown("space")&& monkey.y>=300){
    monkey.velocityY=-18;
  }
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    survivalTime=survivalTime+1;
  }
  
  if (monkey.isTouching(obstacleGroup)){
        gameState = 0;
    }
    
    if (gameState===END){
    survivalTime=0;
      monkey.changeAnimation(deadMonkeyImage);
  stroke("white")
  textSize(10)
  fill(rgb(255, 255, 255))
  text("G A M E  O V E R !",295,200)
      obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    ground.velocityX=0;
      monkey.changeAnimation("sprite_1");
    }
  
  monkey.velocityY=monkey.velocityY+0.6;
  monkey.collide(ground);
  

  drawSprites();
  bananas();
  obstacles();
}

function bananas() {
  if (frameCount%180===0){
    banana=createSprite(600,100,40,10);
    banana.y=Math.round(random(220,50));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=250;
    FoodGroup.add(banana)
}
}

function obstacles(){
  if (frameCount%300===0){
   obstacle=createSprite(240,355,40,40);
    obstacle.velocityX=-3;
    obstacle.collide(ground);
    obstacle.scale=0.2;
    obstacle.lifetime=200;
    obstacle.addImage(obstaceImage);
    obstacleGroup.add(obstacle)
  }
}


