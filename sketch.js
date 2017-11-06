 // Zombulator by Garrett Gunnell

var population = [];
var fightText = [];
var backgroundColor;
var zombieBackground;
const MIN_SIZE = 25;
const MAX_SIZE = 50;
const POPULATION_SIZE = 200;
const POPULATION_RATIO = 50;

var numFights = 0;

function preload() {
	zombieBackground = loadImage("https://i.imgur.com/Own5Doo.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(254, 247, 255);
	initializePopulation();
}

function draw() {
	background(zombieBackground);
	noStroke();

	drawPopulationCount();
  drawPopulation();
  movePopulation();
  handleCollisions();
  drawFightText();
  moveFightText();
}

function initializePopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		x = random(0, 100);

		if (x <= 5) {
			population[i] = initializeSuperZombie();
		} else if (x <= POPULATION_RATIO) {
			population[i] = initializeZombie();
		}	else {
			population[i] = initializeHuman();
		}
	}
}

function drawPopulationCount() {
	zombiePop = 0;
	humanPop = 0;

	 for (var i = 0; i < POPULATION_SIZE; ++i) {
  	person = population[i];

  	if (person.isHuman == true) {
  		++humanPop;
  	} else if (person.isZombie == true) {
  		++zombiePop;
  	}
  };

	fill(255);
  textFont("Arial", 12);
  text("Zombies: " + zombiePop, width / 2, 25);
  text("Humans: " + humanPop, width / 2, height - 25);
}

function drawPopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		population[i].draw();
	}
}

function movePopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		population[i].move();
	}
}

function initializeZombie() {
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

			if (d < (this.size / 2) + (defender.size / 2)) {
				return true
			} else {
				return false
			}
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

function initializeSuperZombie() {
	return {
		position: createVector(random(100, width - 100), random(50, 150)),
		size: random(MIN_SIZE + 25, MAX_SIZE + 25),
		color: color(random(100,200), 255, random(100,200), 255),
		speed: random(0.5,1),
		isZombie: true,
		isHuman: false,
		infectionChance: 100,
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

			if (d < (this.size / 2) + (defender.size / 2)) {
				return true
			} else {
				return false
			}
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


function initializeHuman() {
	return {
		position: createVector(random(100, width - 100), random(height - 150, height - 50)),
		color: color(random(100,200), 200, 255, 200),
		size: random(MIN_SIZE, MAX_SIZE),
		speed: random(0.5,1),
		isHuman: true,
		isZombie: false,
		infectionChance: 70,
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.sub(0, this.speed);
			this.position.add(random(-1,1), random(-1, 1));
		},
		isTouching: function(defender) {
			return false
		},
		becomeZombie: function() {
			this.move = function() {
				this.position.add(0, this.speed);
				this.position.add(random(-1,1), random(-1, 1));
			};
			this.color = color(random(100,200), 255, random(100,200), 200);
			this.isHuman = false
			this.isZombie = true
			this.isTouch = function(defender) {
				var d = dist(this.position.x, this.position.y, defender.position.x, defender.position.y);

				if (d < (this.size / 2) + (defender.size / 2)) {
					return true
				} else {
					return false
				}
			}
		},
		isDead: function() {
			return;
		}
	}
}

function handleCollisions() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		var attacker = population[i];
		for (var j = i + 1; j < POPULATION_SIZE; ++j) {
			var defender = population[j];
			var encounter = random(0, 100);

			if (attacker.isTouching(defender) == true && defender.isHuman == true && encounter <= attacker.infectionChance) {
				addFightText(defender);
				defender.becomeZombie();
			} else if (attacker.isTouching(defender) == true && defender.isHuman == true && encounter > attacker.infectionChance) {
				addFightText(defender);
				attacker.isDead();
			}
		}
	}
}

function initializeFightText(defenderX, defenderY) {
	return {
		position: createVector(defenderX, defenderY),
		alpha: 255,
		font: textFont("Arial", 12),
		stroke: stroke(0,0,0),
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