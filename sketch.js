 // Zombulator by Garrett Gunnell

var zombies;
var humans;
var backgroundColor;
const MIN_SIZE = 25;
const MAX_SIZE = 50;
const NUMBER_OF_HUMANS = 200;
const NUMBER_OF_ZOMBIES = 200;

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
	zombies = [];

	zombieXs = [];
	zombieYs = [];
	zombieSizes = [];
	zombieColors = [];
	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
		initializeZombie(i);
	}
}

function initializeZombie(index) {
	zombies[index] = {
		x: random(100, windowWidth - 100),
		y: random(50, 150),
		size: random(MIN_SIZE,MAX_SIZE),
		color: color(random(100,200), 255, random(100,200), 150),
	};
}

function drawZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		drawZombie(i);
	}
}

function drawZombie(index) {
	zombie = zombies[index];
	fill(zombie.color);
	ellipse(zombie.x, zombie.y, zombie.size, zombie.size);	
}

function moveZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		moveZombie(i);
	}
}

function moveZombie(index) {
	zombies[index].y += 0.5;
	zombies[index].y += random(-1,1);
	zombies[index].x += random(-1,1);	
}

function initializeHumans() {
	humans = [];

	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		initializeHuman(i);
	}
}

function initializeHuman(index) {
	humans[index] = {
		x: random(100, windowWidth - 100),
		y: random(windowHeight - 150, windowHeight - 50),
		color: color(random(100,200), 200, 255, 150),
		size: random(MIN_SIZE, MAX_SIZE),
	}
}

function drawHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		drawHuman(i);
	}
}

function drawHuman(index) {
	human = humans[index];
		fill(human.color);
		ellipse(human.x, human.y, human.size, human.size);	
}

function moveHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		moveHuman(i);
	}

function moveHuman(index) {
	humans[index].y -= 0.5;
	humans[index].y -= random(-1,1);
	humans[index].x += random(-1,1);	
}
}