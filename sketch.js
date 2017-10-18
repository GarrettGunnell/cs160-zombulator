// Zombulator by Garrett Gunnell


var zombieY;
var zombieX;
var zombieV = 0;
var zombieA = 0.8;
var zombieDamping = -0.2;
var zombieSize = 80;
var zombieColor;

var humanY;
var humanX;
var humanV = 0;
var humanVx = 0;
var humanA = 0.3;
var humanAx = 0.07;
var humanDamping = -0.7;
var humanSize;
var humanColor;

var img;
var imgX = 1000;
var imgY = 100;
var imgV = 0;
var imgA = 0.3;
var imgDamping = -0.4;
var imgSize = 150;

var backgroundColor;

const MIN_SIZE = 25;
const MAX_SIZE = 150;

function preload() {
	img = loadImage("https://i.imgur.com/I5mZrzP.jpg")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(255, 250, 244);
	initializeZombie();
	initializeHuman();
}

function draw() {
	background(backgroundColor);
  	noStroke();
  	//image(img, imgX, imgY, imgSize, imgSize);

  	drawZombie();
  	//moveZombie();
  	drawHuman();
  	//moveHuman();
  	zombieY += 1
  	humanY -= 1

}

function moveImg() {
	imgY += imgV;
	imgV += imgA;
	if (imgY + imgSize >= windowHeight) {
		imgY = windowHeight - imgSize;
		imgV *= imgDamping;
	}
}

function initializeZombie() {
	zombieX = random(100, windowWidth - 100);
	zombieY = random(100, 200);
	zombieSize = random(MIN_SIZE, MAX_SIZE);
	zombieColor = color(random(100, 200), 255, 0, random(100, 200));
}

function drawZombie() {
	fill(zombieColor);
  	ellipse(zombieX, zombieY, zombieSize, zombieSize);
}

function moveZombie() {
	zombieY += zombieV;
  	zombieV += zombieA;
  	if (zombieY + (zombieSize) >= windowHeight) {
    	zombieY = windowHeight - (zombieSize);
    	zombieV *= zombieDamping;
  	}
}

function initializeHuman() {
	humanX = random(100, windowWidth - 100);
	humanY = random(windowHeight - 200, windowHeight - 100);
	humanSize = random(MIN_SIZE, MAX_SIZE);
	humanColor = color(random(75,200),random(75,200),255, 150);

}

function drawHuman() {
	fill(humanColor);
  	ellipse(humanX, humanY, humanSize, humanSize);
}

function moveHuman() {
	humanY += humanV;
	humanX += humanVx;
  	humanV += humanA;
  	humanVx += humanAx;
  	if (humanY + (humanSize / 2) >= windowHeight) {
    	humanY = windowHeight - (humanSize / 2);
    	humanV *= humanDamping;
  	}
  	if (humanX - (humanSize / 2) >= windowWidth) {
  		humanX = 0
  		humanY = 0
  		humanV = 0
  		humanVx = 0
  	}
}