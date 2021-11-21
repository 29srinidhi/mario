var PLAY=1
var end=0
var gameState=PLAY
var mario,mario_run,mario_collided;
var ground,invisible_ground,groundimg;
var obstacle1,obstacle2,obstacle3,obstaclesgroup;
var coinimg,coingroup,coinsound;
var score=0;
var life=3;
var restart,restartimg;

function preload() {
 mario_run=loadAnimation("Capture1.png","Capture3.png","Capture4.png")
 mario_collided=loadAnimation("mariodead.png") 
 groundimg=loadImage("backg.jpg")
 coinsound=loadSound("coin.wav")
 coinimg=loadImage("coin.png")
 obstacle1=loadImage("obstacle1.png")
 obstacle2=loadImage("obstacle2.png")
 obstacle3=loadImage("obstacle3.png")
 restartimg=loadImage("restart.png")
 }

function setup() {
  createCanvas(600, 200);
  mario= createSprite(50,100,30,40)
  mario.addAnimation("run",mario_run)
  mario.scale=0.5

  ground= createSprite(0,160,1000,10)
  // ground.addImage("brick",groundimg)
  ground.x=ground.width/2

  restart= createSprite(300,150,40,40)
  restart.addImage("button",restartimg)
  restart.scale=0.7
  restart.visible=false

  coingroup=new Group();
  obstaclesgroup= new group();
  score=0
  
}

function draw() {
  background("blue");
if (gameState===PLAY){

if(keyDown("space")){
mario.velocityY=-10
}
mario.velocityY=mario.velocityY+0.7

 if(ground.x<0){
ground.x=ground.width/2
 }
 
 mario.collide(ground)

 spawnCoin()
 if(obstaclesgroup.isTouching(mario)){
life=life-1
 }

 if(coingroup.isTouching(mario)){
 score=score+1
 }
}
else if (gameState===end){
restart.visible=true
text("restart",250,150)
mario.addAnimation("collided",mario_collided)
ground.velocityX=0
mario.velocityY=0
obstaclesgroup.setVelocityXEach(0)
coingroup.setVelocityXEach(0)
mario.changeAnimation("collided",mario_collided)
mario.scale=0.3
obstaclesgroup.setLifetimeEach(-1)
coingroup.setLifetimeEach(-1)
}

if(mousePressedOver(restart)){
if(life>0){
reset ()
}
}
 drawSprites()
}
function spawnCoin(){

if(frameCount%60===0){
var coin= createSprite(600,100,40,10)
coin.y=Math.round(random(80,100))
coin.addImage(coinimg)
coin.scale=0.1
coin.velocityX=-3
coin.lifetime=200
coingroup.add(coin)
}
}
function spawnObstacles(){
if(frameCount%60===0) {
var obstacle=createSprite(600,160,10,40)
var rand =Math.round(random(1,3))
switch(rand){
case 1:
obstacle.addImage(obstacle1);
break;

case 2:
obstacle.addImage(obstacle3);
break;

case 3:
obstacle.addImage(obstacle3);
break;

}
obstacle.velocityX=-(6+3*score/100)
obstacle.scale=0.2
obstacle.lifetime=200
obstaclesgroup.add(obstacle)
} 
}
