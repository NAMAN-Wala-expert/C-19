var player,bg,bgImg,playerS
var asteroid,asteroidImg
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOver,g_img;
var go,go_img;
var suspense,suspense_wav;
var distance=0;

function preload(){
    bgImg = loadImage("space.jpg");
    playerS = loadImage("r.png");
    asteroidImg = loadImage("a.png");
    asteroidImg = loadImage("a.png");
    g_img = loadImage ("g.png");
    go_img = loadSound ("sad.wav");
    suspense = loadSound ("suspense.wav");
}

function setup() {
    createCanvas(windowWidth/2,windowHeight);

    bg = createSprite(windowWidth/4,120);
    bg.addImage(bgImg);
    bg.scale = 2.3;
    bg.velocityY = 9;
  
    player = createSprite(windowWidth/4,windowHeight/1.3,30,30);
    player.addImage(playerS);
    player.scale = 0.5;
    player.velocityY = 1.5; 
   
 asteroidGroup = new Group();
}

function draw() {
    background(0);    
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance:" + distance, 500,windowHeight/10);

     if (gameState===PLAY) {

      distance = distance + Math.round(getFrameRate()/62);    

    if(bg.y > 570 ){
    bg.y = 120;
    bg.velocityY = 9;
    player.velocityY = 1.5
  }

  if (World.frameCount % 70 === 0) {
    asteroid_G();
  }

  if(keyDown("RIGHT_ARROW")) {
    player.x = player.x+5
  }

  if(keyDown("LEFT_ARROW")) {
    player.x = player.x-5
  }   
  
  if(keyDown("UP_ARROW")) {
    player.y = player.y-9
  }   

  if(keyDown("DOWN_ARROW")) {
    player.y = player.y+5
  }

  if(player.isTouching(asteroidGroup)) {
    gameState = 0
  } 

  edges= createEdgeSprites();
   player .collide(edges);

  if (gameState === END) {
    go_img.play();
  }

  if (World.frameCount % 70 === 0) {
    asteroid.velocityY = asteroid.velocityY + 2
  }

}else if (gameState === END) {

  text("GameOVER You Lost" , 200,windowHeight/2);

    player.velocityX = 0;
    player.velocityY = 0;
    bg.velocityY = 0;   



    if ( keyDown("space") && gameState===END) {
      reset();      
    }
    asteroidGroup.destroyEach();   
    
  }
}

function asteroid_G(){
  asteroid =createSprite(Math.round(random(50, 500)),windowHeight/100);
  asteroid.scale =0.5;
  asteroid.velocityY = 4
  asteroid.addImage(asteroidImg);
  asteroidGroup.setLifetimeEach(19);
  asteroidGroup.add(asteroid);
}

function reset(){
  gameState = PLAY; 
  
  asteroidGroup.destroyEach();
  bg.velocityY = 9;
  player.velocityY = 4;  
  distance = 0;

  player.x = windowWidth/4;
  player.y = windowHeight/1.3
 

     
  
 }