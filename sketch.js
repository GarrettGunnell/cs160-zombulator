 // Zombulator by Garrett Gunnell

var zombies;
var humans;
var backgroundColor;
const MIN_SIZE = 25;
const MAX_SIZE = 60;
const NUMBER_OF_HUMANS = 100;
const NUMBER_OF_ZOMBIES = 100;


function preload() {
	zombieBackground = loadImage("https://i.imgur.com/Own5Doo.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(254, 247, 255);
	initializeZombies();
	initializeHumans();
}

function draw() {
	background(zombieBackground);
  	noStroke();

  	fill(0);
  	textFont("Arial", 10);
  	//text("Zombies: " + NUMBER_OF_ZOMBIES, width / 2, 25);
  	//text("Humans: " + NUMBER_OF_HUMANS, width / 2, height - 25);

  	drawZombies();
  	drawHumans();
  	moveZombies();
  	moveHumans();

}

function initializeZombies() {
	zombies = [];

	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
		zombies[i] = initializeZombie();
	}
}

function initializeZombie() {
	return {
		position: createVector(random(100, width - 100), random(50, 150)),
		size: random(MIN_SIZE,MAX_SIZE),
		color: color(random(100,200), 255, random(100,200), 200),
		speed: random(0.5,1),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);	
		},
		move: function() {
			this.position.add(0, this.speed);
			this.position.add(random(-1,1), random(-1,1));
		},
	};
}

function drawZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		zombies[i].draw();
	}
}

function moveZombies() {
	for (var i = 0;i < NUMBER_OF_ZOMBIES; ++i) {
		zombies[i].move();
	}
}

function initializeHumans() {
	humans = [];

	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		humans[i] = initializeHuman();
	}
}

function initializeHuman() {
	return {
		position: createVector(random(100, width - 100), random(height - 150, height - 50)),
		color: color(random(100,200), 200, 255, 200),
		size: random(MIN_SIZE, MAX_SIZE),
		speed: random(0.5,1),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.sub(0, this.speed);
			this.position.add(random(-1,1), random(-1, 1));
		},
	}
}

function drawHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		humans[i].draw();
	}
}

function moveHumans() {
	for (var i = 0;i < NUMBER_OF_HUMANS; ++i) {
		humans[i].move();
	}
}	