var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup,
  obstacle1,
  obstacle2,
  obstacle3,
  obstacle4,
  obstacle5,
  obstacle6;
var score;

function preload() {
  trex_running = loadAnimation(
    "./assets/trex1.png",
    "./assets/trex3.png",
    "./assets/trex4.png"
  );
  trex_collided = loadImage("./assets/trex_collided.png");
  groundImage = loadImage("./assets/ground2.png");
  cloudImage = loadImage("./assets/cloud.png");
  obstacle1 = loadImage("./assets/obstacle1.png");
  obstacle2 = loadImage("./assets/obstacle2.png");
  obstacle3 = loadImage("./assets/obstacle3.png");
  obstacle4 = loadImage("./assets/obstacle4.png");
  obstacle5 = loadImage("./assets/obstacle5.png");
  obstacle6 = loadImage("./assets/obstacle6.png");
}

function setup() {
  createCanvas(1200, 600);
  trex = createSprite(50, 580, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.75;

  ground = createSprite(200, 580, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 590, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(180);

  score = score + Math.round(getFrameRate() / 60);
  textSize(35)
  text("Score: " + score, 1000, 50);
  

  if (keyDown("space")) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1300, 520, 40, 10);
    cloud.y = Math.round(random(80, 520));
    cloud.addImage(cloudImage);
    cloud.scale = 0.75;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 1350;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(1300, 555, 10, 40);
    obstacle.velocityX = -4;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.75;
    obstacle.lifetime = 1350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
