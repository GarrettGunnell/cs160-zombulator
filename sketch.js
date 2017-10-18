 // Zombulator by Garrett Gunnell


var zombieYs;
var zombieXs;
var zombieSizes;
var zombieColors;

var humanYs;
var humanXs;
var humanSizes;
var humanColors;

var circleX;
var circleY;

var backgroundColor;

const MIN_SIZE = 25;
const MAX_SIZE = 80;
const NUMBER_OF_HUMANS = 100;
const NUMBER_OF_ZOMBIES = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(255, 250, 244);
	initializeZombies();
	initializeHumans();
	circleX = windowWidth / 2;
	circleY = windowHeight / 2;
}

function draw() {
	background(backgroundColor);
  	noStroke();

  	drawZombies();
  	drawHumans();
  	moveZombies();
  	moveHumans();

}

function initializeZombies() {
	zombieXs = [];
	zombieYs = [];
	zombieSizes = [];
	zombieColors = [];
	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
		zombieXs[i] = random(100, windowWidth - 100);
		zombieYs[i] = random(50, 150);
		zombieSizes[i] = random(MIN_SIZE,MAX_SIZE);
		zombieColors[i] = color(random(100,200), 255, random(100,200), 150);
	}
}

function drawZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		fill(zombieColors[i]);
		ellipse(zombieXs[i], zombieYs[i], zombieSizes[i], zombieSizes[i]);
	}
}

function moveZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		zombieYs[i] += 0.5;
		zombieXs[i] += random(-1,1);
	}
}

function initializeHumans() {
	humanXs = []
	humanYs = []
	humanColors = []
	humanSizes = []

	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		humanXs[i] = random(100, windowWidth - 100);
		humanYs[i] = random(windowHeight - 150, windowHeight - 50);
		humanColors[i] = color(random(100,200), 200, 255, 150);
		humanSizes[i] = random(MIN_SIZE, MAX_SIZE);
	}

}

function drawHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		fill(humanColors[i]);
		ellipse(humanXs[i], humanYs[i], humanSizes[i], humanSizes[i]);
	}
}

function moveHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		humanYs[i] -= 0.5;
		humanXs[i] += random(-1,1);
	}
}