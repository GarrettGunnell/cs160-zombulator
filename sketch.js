 // Zombulator by Garrett Gunnell

var xoff = 0;

var zombies;
var humans;
var backgroundColor;
const MIN_SIZE = 25;
const MAX_SIZE = 50;
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
	zombies = [];

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
		speed: random(0.5,1),
	};
}

function drawZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		drawZombie(zombies[i]);
	}
}

function drawZombie(zombie) {
	fill(zombie.color);
	ellipse(zombie.x, zombie.y, zombie.size, zombie.size);	
}

function moveZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		moveZombie(zombies[i]);
	}
}

function moveZombie(zombie) {
	zombie.y += zombie.speed;
	zombie.y += random(-1,1);
	zombie.x += random(-1,1);	
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
		speed: random(0.5,1),
	}
}

function drawHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		drawHuman(humans[i]);
	}
}

function drawHuman(human) {
		fill(human.color);
		ellipse(human.x, human.y, human.size, human.size);	
}

function moveHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		moveHuman(humans[i]);
	}
}	

function moveHuman(human) {
	human.y -= human.speed;
	human.y -= random(-1,1);
	human.x += random(-1,1);	
}
