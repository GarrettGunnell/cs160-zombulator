 // Zombulator by Garrett Gunnell
 // Humans and zombie objects move towards each other and interact once they collide

var population = [];
var fightText = [];
var skull = [];
var img;
var skull;
const MIN_SIZE = 20;
const MAX_SIZE = 40;
const POPULATION_SIZE = 200;
const POPULATION_RATIO = 40;

var numFights = 0;
var zombiePop = 0;
var humanPop = 0;
var numSkulls = 0;

function preload() {
	img = loadImage("https://i.imgur.com/H6nR504.png");
	skull = loadImage("https://i.imgur.com/G8zwwib.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	initializePopulation();
}

function draw() {
	background(img);
	noStroke();

	drawSkulls();
	drawPopulationCount();
	drawPopulation();
	movePopulation();
	handleCollisions();
	//drawFightText();
	//moveFightText();
}

function initializePopulation() { // Creates zombie and human objects and puts them in an array
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		x = random(0, 100);

		if (x <= POPULATION_RATIO) {
			population[i] = initializeZombie();
			++zombiePop;
		}	else {
			population[i] = initializeHuman();
			++humanPop;
		}
	}
}

function drawPopulationCount() { // Draws how many humans and zombies there are
	fill(0);
  textFont("Verdana", 20);
  stroke(0);
  text("Zombies: " + zombiePop, width / 2, 25);
  text("Humans: " + humanPop, width / 2, height - 30);
}

function drawPopulation() { // Utilizes the draw object behavior to draw the objects in the population array
	noStroke();
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		population[i].draw();
	}
}

function movePopulation() { // Utilizes the move object behavior to move the objects in the population array
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		population[i].move();
	}
}

function initializeZombie() { // Zombie object
	return {
		position: createVector(random(100, width - 100), random(50, 150)),
		size: random(MIN_SIZE,MAX_SIZE),
		color: color(random(100,200), 255, random(100,200), 200),
		speed: random(0.5,1),
		isZombie: true,
		isHuman: false,
		infectionChance: 70,
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);	
		},
		move: function() {
			this.position.add(0, this.speed);
			this.position.add(random(-1,1), random(-1,1));
		},
		isTouching: function(defender) {
			var d = dist(this.position.x, this.position.y, defender.position.x, defender.position.y);

			return d < (this.size / 2) + (defender.size / 2)
		},
		becomeZombie: function() {
			return;
		},
		isDead: function() {
			this.position = createVector(0, 0);
			this.color = (0,0,0,0);
			this.speed = 0;
			this.isZombie = false;
			this.isHuman = false;
			this.draw = function() {
				return;
			};
			this.move = function() {
				return;
			};
			this.isTouching = function() {
				return;
			};
		}
	};
}

function initializeHuman() { // Human object
	return {
		position: createVector(random(100, width - 100), random(height - 150, height - 50)),
		color: color(random(100,200), 200, 255, 200),
		size: random(MIN_SIZE, MAX_SIZE),
		speed: random(0.5,1),
		isHuman: true,
		isZombie: false,
		winChance: 30,
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.sub(0, this.speed);
			this.position.add(random(-1,1), random(-1, 1));
		},
		isTouching: function(defender) {
			var d = dist(this.position.x, this.position.y, defender.position.x, defender.position.y);

			return d < (this.size / 2) + (defender.size / 2)
		},
		becomeZombie: function() {
			this.move = function() {
				this.position.add(0, this.speed);
				this.position.add(random(-1,1), random(-1, 1));
			};
			this.color = color(random(100,200), 255, random(100,200), 200);
			this.isHuman = false
			this.isZombie = true
			this.isTouching = function(defender) {
				var d = dist(this.position.x, this.position.y, defender.position.x, defender.position.y);
				return d < (this.size / 2) + (defender.size / 2)
			},
			this.isDead = function() {
				this.position = createVector(0, 0);
				this.color = (0,0,0,0);
				this.speed = 0;
				this.isZombie = false;
				this.isHuman = false;
				this.draw = function() {
					return;
				};
				this.move = function() {
					return;
				};
				this.isTouching = function() {
					return;	
				}
			}
		},
		isDead: function() {
			return;
		}
	}
}

function handleCollisions() { // Detects collisions between humans and zombies
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		var attacker = population[i];
		for (var j = i + 1; j < POPULATION_SIZE; ++j) {
			var defender = population[j];

			handleFights(attacker, defender);
		}
	}
}


function handleFights(attacker, defender) { // Handles the outcomes of the collisions between humans and zombies
	var encounter = random(0, 100);

	if (attacker.isTouching(defender) == true && attacker.isZombie == true && defender.isHuman == true && encounter <= attacker.infectionChance) {
		//addFightText(defender);
		defender.becomeZombie();
		--humanPop;
		++zombiePop;
	} else if (attacker.isTouching(defender) == true && attacker.isZombie == true && defender.isHuman == true && encounter > attacker.infectionChance) {
		addSkull(defender);
		//addFightText(defender);
		attacker.isDead();
		--zombiePop;
	} else if (attacker.isTouching(defender) == true && attacker.isHuman == true && defender.isZombie == true && encounter < attacker.winChance) {
		addSkull(defender);
		//addFightText(attacker);
		defender.isDead();
		--zombiePop;
	} else if (attacker.isTouching(defender) == true && attacker.isHuman == true && defender.isZombie == true && encounter >= attacker.winChance) {
		//addFightText(attacker);
		attacker.becomeZombie();
		--humanPop;
		++zombiePop;	
	}
}

function initializeSkull(defenderX, defenderY) { // Skull and cross bones object
	return {
		position: createVector(defenderX, defenderY),
		draw: function() {
			image(skull, this.position.x, this.position.y, 60, 55);
		},
	}
}

function addSkull(defender) { // Adds a skull object to an array
	defenderX = defender.position.x;
	defenderY = defender.position.y;
	skull[numSkulls] = initializeSkull(defenderX, defenderY);
	numSkulls += 1;
}

function drawSkulls() { // Draws the skulls, showing where a zombie died
	for (var i = 0; i < numSkulls; ++i) {
		skull[i].draw();
	}
}

function initializeFightText(defenderX, defenderY) {
	return {
		position: createVector(defenderX, defenderY),
		alpha: 255,
		font: textFont("Arial", 12),
		stroke: stroke(0),
		draw: function() {
			fill(255, this.alpha);
			stroke(0, this.alpha);
			textFont("Arial", 15);
			text("Fight!", this.position.x, this.position.y);
		},
		move: function() {
			this.position.sub(0, 1);
			this.alpha -= 3;
		},
	}
}

function addFightText(defender) {
	defenderX = defender.position.x
	defenderY = defender.position.y
	fightText[numFights] = initializeFightText(defenderX, defenderY);
	numFights += 1;
}

function drawFightText() {
	for (var i = 0; i < numFights; ++i) {
		fightText[i].draw();
	};
}

function moveFightText() {
	for (var i = 0; i < numFights; ++i) {
		fightText[i].move();
	};
}