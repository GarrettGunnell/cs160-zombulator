 // Zombulator by Garrett Gunnell

var population = [];
var fightText = [];
var backgroundColor;
var zombieBackground;
const MIN_SIZE = 20;
const MAX_SIZE = 50;
const POPULATION_SIZE = 200;
const POPULATION_RATIO = 50;

var circle1;
var circle2;

var numFights = 0;
var zombiePop = 0;
var humanPop = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(254, 247, 255);
	initializePopulation();
	circle1 = createCircle1();
	circle2 = createCircle2();
}

function draw() {
	background(255);
	noStroke();

	//circle1.draw();
	//circle1.move();
	//circle2.draw();
	//circle2.move();

	//if (dist(circle1.position.x, circle1.position.y, circle2.position.x,circle2.position.y) <= circle1.size / 2 + circle2.size / 2) {
		//circle2.drawGuts();
	//}

	drawPopulationCount();
	drawPopulation();
	movePopulation();
	handleCollisions();
	drawFightText();
	moveFightText();
}

function createCircle1() {
	return {
		position: createVector(windowWidth / 2, 200),
		size: 50,
		color: color(0, 200, 0, 150),
		move: function() {
			this.position.add(0, 1);
		},
		draw: function() {
			noStroke();
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
	}
}

function createCircle2() {
	return {
		position: createVector(windowWidth / 2, windowHeight - 200),
		size: 50,
		color: color(0, 0, 200, 150),
		gutsColor: color(150, 0, 0, 100),
		move: function() {
			this.position.sub(0, 1);
		},
		draw: function() {
			noStroke();
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		drawGuts: function() {
			this.draw = function() {
				noStroke();
				fill(this.gutsColor);
				ellipse(this.position.x - 6, this.position.y, 5, 5);
				ellipse(this.position.x - 4, this.position.y + 4, 5, 5);
				ellipse(this.position.x + 4, this.position.y + 4, 5 ,5);
				ellipse(this.position.x + 6, this.position.y, 5, 5);
			}
			this.move = function() {
				return;
			}
		}			
	};
}

function initializePopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		x = random(0, 100);

		if (x <= 5) {
			population[i] = initializeSuperZombie();
			++zombiePop;
		} else if (x <= POPULATION_RATIO) {
			population[i] = initializeZombie();
			++zombiePop;
		}	else {
			population[i] = initializeHuman();
			++humanPop;
		}
	}
}

function drawPopulationCount() {
	fill(255);
  textFont("Arial", 14);
  stroke(0);
  text("Zombies: " + zombiePop, width / 2, 25);
  text("Humans: " + humanPop, width / 2, height - 25);
}

function drawPopulation() {
	noStroke();
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
		size: 50,
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

			if (d < (this.size / 2) + (defender.size / 2)) {
				return true
			} else {
				return false
			}
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

function handleCollisions() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		var attacker = population[i];
		for (var j = i + 1; j < POPULATION_SIZE; ++j) {
			var defender = population[j];
			var encounter = random(0, 100);

			handleFights(attacker, defender);
		}
	}
}


function handleFights(attacker, defender) {
	var encounter = random(0, 100);

	if (attacker.isTouching(defender) == true && attacker.isZombie == true && defender.isHuman == true && encounter <= attacker.infectionChance) {
		addFightText(defender);
		defender.becomeZombie();
		--humanPop;
		++zombiePop;
	} else if (attacker.isTouching(defender) == true && attacker.isZombie == true && defender.isHuman == true && encounter > attacker.infectionChance) {
		addFightText(defender);
		attacker.isDead();
		--zombiePop;
	} else if (attacker.isTouching(defender) == true && attacker.isHuman == true && defender.isZombie == true && encounter < attacker.winChance) {
		addFightText(attacker);
		defender.isDead();
		--zombiePop;
	} else if (attacker.isTouching(defender) == true && attacker.isHuman == true && defender.isZombie == true && encounter >= attacker.winChance) {
		addFightText(attacker);
		attacker.becomeZombie();
		--humanPop;
		++zombiePop;	
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