 // Zombulator by Garrett Gunnell


var zombieYs;
var zombieXs;
var zombieSizes;
var zombieColors;

var humanYs;
var humanXs;
var humanSizes;
var humanColors;

var backgroundColor;

const MIN_SIZE = 25;
const MAX_SIZE = 80;
const NUMBER_OF_HUMANS = 100;
const NUMBER_OF_ZOMBIES = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(254, 247, 255);
	initializeZombies();
	initializeHumans();
}

function draw() {
	background(255);
  	noStroke();

  	fill(0);
  	textFont("Arial", 10);
  	text("Zombies: " + NUMBER_OF_ZOMBIES, windowWidth / 2, 25);
  	text("Humans: " + NUMBER_OF_HUMANS, windowWidth / 2, windowHeight - 25);

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
		initializeZombie(i);
	}
}

function initializeZombie(index) {
		zombieXs[index] = random(100, windowWidth - 100);
		zombieYs[index] = random(50, 150);
		zombieSizes[index] = random(MIN_SIZE,MAX_SIZE);
		zombieColors[index] = color(random(100,200), 255, random(100,200), 150);
}

function drawZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		drawZombie(i);
	}
}

function drawZombie(index) {
		fill(zombieColors[index]);
		ellipse(zombieXs[index], zombieYs[index], zombieSizes[index], zombieSizes[index]);	
}

function moveZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		moveZombie(i);
	}
}

function moveZombie(index) {
		zombieYs[index] += 0.5;
		zombieYs[index] += random(-1,1);
		zombieXs[index] += random(-1,1);	
}

function initializeHumans() {
	humanXs = []
	humanYs = []
	humanColors = []
	humanSizes = []

	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		initializeHuman(i);
	}

}

function initializeHuman(index) {
		humanXs[index] = random(100, windowWidth - 100);
		humanYs[index] = random(windowHeight - 150, windowHeight - 50);
		humanColors[index] = color(random(100,200), 200, 255, 150);
		humanSizes[index] = random(MIN_SIZE, MAX_SIZE);	
}

function drawHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		drawHuman(i);
	}
}

function drawHuman(index) {
		fill(humanColors[index]);
		ellipse(humanXs[index], humanYs[index], humanSizes[index], humanSizes[index]);	
}

function moveHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		moveHuman(i);
	}

function moveHuman(index) {
		humanYs[index] -= 0.5;
		humanYs[index] -= random(-1,1);
		humanXs[index] += random(-1,1);	
}
}