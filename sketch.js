// Zombulator by Garrett Gunnell


var zombieY = 100;
var zombieX;
var zombieV = 0;
var zombieA = 0.1;
var zombieDamping = -0.6;
var zombieSize = 80;
var zombieColor;

var humanY = 0;
var humanX;
var humanV = 0;
var humanVx = 0;
var humanA = 0.15;
var humanAx = 0.1;
var humanDamping = -0.4;
var humanSize = 80;
var humanColor;

var img;
var imgX = 1000;
var imgY = 100;
var imgV = 0;
var imgA = 0.3;
var imgDamping = -0.4;
var imgSize = 80;

var backgroundColor;


function preload() {
	img = loadImage("https://i.imgur.com/I5mZrzP.jpg")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(252, 232, 238);
	humanColor = color(145, 187, 255);
	zombieColor = color(43, 206, 127);
	zombieX = 500;
	humanX = 0;
}

function draw() {
	background(backgroundColor);
  	noStroke();
  	image(img, imgX, imgY, imgSize, imgSize);

  	drawZombie();
  	moveZombie();
  	drawHuman();
  	moveHuman();
  	moveImg();
}

function moveImg() {
	imgY += imgV;
	imgV += imgA;
	if (imgY + imgSize >= windowHeight) {
		imgY = windowHeight - imgSize;
		imgV *= imgDamping;
	}
}

function drawZombie() {
	fill(zombieColor);
  	rect(zombieX, zombieY, zombieSize, zombieSize);
}

function moveZombie() {
	zombieY += zombieV;
  	zombieV += zombieA;
  	if (zombieY + (zombieSize) >= windowHeight) {
    	zombieY = windowHeight - (zombieSize);
    	zombieV *= zombieDamping;
  	}
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
}