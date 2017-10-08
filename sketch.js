// Zombulator by Garrett Gunnell


var zombieX = 0
var zombie2X = 50
var zombieY = 0
var zombieReverse = 1920


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	var randomnum = Math.floor((Math.random() * 81) + 50);
	var randomnum2 = Math.floor(Math.random() * 151);
	var randomSize = Math.floor((Math.random() * 50) + 10)
	var randomcolor1 = Math.floor(Math.random() * 256);
	var randomcolor2 = Math.floor(Math.random() * 256);
	var randomcolor3 = Math.floor(Math.random() * 256);
	var randompos1 = Math.floor(Math.random() * 1921);
	var randompos2 = Math.floor(Math.random() * 1081);
	background(255, 255, 255);
	noStroke();
	fill(255,128,255);
	ellipse(zombieX, 50, 80, 80);
	ellipse(zombie2X, 150, 80, 80);
	//zombieY = zombieY + 1;

	//text(windowWidth, 100, 100)

	if (zombieX >= 1920) {
		if (zombieReverse <= 1920 && zombieReverse > 0) {
			fill(255,255,255);
			ellipse(zombieX, 50, 90, 90);
			fill(255,128,255);
			ellipse(zombieReverse, 50, 80, 80);
			zombieReverse = zombieReverse - 5;
		} else if (zombieReverse <= 0) {
			zombieX = 0;
			zombieReverse = 1920;
		}
	} else {
		zombieX = zombieX + 5;
	}

	if (zombie2X >=windowWidth) {
		zombie2X = 0
	} else {
		zombie2X = zombie2X + 1
	}

	//fill(randomcolor1, 0,0);
	//ellipse(randompos1, randompos2, randomnum, randomnum);
	//fill(0, 0, 0);
	//textSize(randomSize);
	//text("A", zombieX, 12);

	//fill(223,0,0);
	//ellipse(mouseX, mouseY, 80, 80);
}

