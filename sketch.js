// Zombulator by Garrett Gunnell


var zombieX = 0;
var zombieY = 100;
var zombieV = 0;
var zombieA = 0.3;
var zombieDamping = -0.6;
var zombieSize = 80
var zombieColor;
var humanY = 175;
var humanX = 175;
var humanV = 0;
var humanA = 0.2;
var humanDamping = -0.7;
var humanSize = 50
var humanColor;
var backgroundColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(255, 198, 224);
	humanColor = color(117, 160, 216);
	zombieColor = color(43, 206, 127);
}

function draw() {
	background(backgroundColor);
	noStroke();
	fill(zombieColor);
	ellipse(windowWidth / 3, zombieY, zombieSize, zombieSize)
	zombieY += zombieV;
	zombieV += zombieA;
	if (zombieY + (zombieSize / 2) >= windowHeight) {
		zombieY = windowHeight - (zombieSize / 2);
		zombieV *= zombieDamping;
	}

	fill(humanColor);
	ellipse(humanX, 250, humanSize, humanSize)
	humanX += humanV;
	humanV += humanA;
	if (humanX + (humanSize / 2) >= windowWidth) {
		humanX = windowWidth - (humanSize / 2);
		humanV *= humanDamping;
	}
}

