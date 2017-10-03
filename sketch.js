// Zombulator by Garrett Gunnell

function setup() {
	createCanvas(1000, 1000);
}

function draw() {
	if (mouseIsPressed) {
		fill(51, 0, 51);
	} else {
		fill(255, 153, 255);
	}
	ellipse(mouseX, mouseY, 80, 80);
}

