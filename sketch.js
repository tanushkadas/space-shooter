var space, spaceimg, player, playerimg, asteroidimg, laser, lasersound, gameState= "play", score= 0 , asteroidGroup, life=3


function preload(){
  spaceimg= loadImage("space-1.jpg");
  playerimg= loadImage("spaceship.png");
  asteroidimg= loadImage("asteroids.png");
  lasersound= loadSound ("fire.mp3");
}

function setup() {
  createCanvas(1500, 700);
  
  space= createSprite(750,350,1500,700);
  space.addImage(spaceimg);
  console.log(space.height);
  space.y=space.height;
  space.velocityY= 4
  
  player= createSprite(750,640);
  player.addImage(playerimg);
  player.scale= 0.5;
  
  laser= createSprite(player.x ,player.y,5,40);
  laser.shapeColor = "red";
  laser.visible= false;
  
  asteroidGroup= new Group ();
  
  
}

function draw() {
  background(0);
  if (gameState==="play"){
           player.x=mouseX;

      if (space.y>700){
          space.y=350
          }

      if (keyDown ("space")){
          laser.x=player.x
          laser.y=player.y
          laser.visible= true;
          laser.velocityY= -6;
          lasersound.play();

          }
      spawnAsteroids();
      if (laser.isTouching(asteroidGroup)){
          asteroidGroup.destroyEach();
          score=score+5;
          }
    
      if (asteroidGroup.isTouching(player)){
          asteroidGroup.destroyEach();
          life= life-1
          }
    if (life===0){
        gameState= "end"
        }
   }
    
  drawSprites();
  
  if (gameState=== "end"){
    background(spaceimg);
    fill("white");
    textSize(80);
    space.velocityY=0;
    text("game over", 750, 350);
  }

  fill("white");
  textSize(30);
  text(score, 750,40);
  
  text("life "+ life, 200,40);
}

function spawnAsteroids() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var asteroids= createSprite(400,0,40,10);
    asteroids.x = random(10,1490);
    asteroids.scale = 0.2;
    asteroids.velocityY = 6;
    asteroids.addImage(asteroidimg);
    
     //assign lifetime to the variable
    asteroids.lifetime = 700/asteroids.velocityY;
    asteroidGroup.add(asteroids);
  
  }
  
}
