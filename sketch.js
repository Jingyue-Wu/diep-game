//Inspired by the browser game diep.io
//Controls: "w/a/s/d" for movement, use cursor to aim, click and hold to shoot, and "e" to toggle autofire
//Objective: Destroy as many shapes as possible without dying

var stage = 0;
var score = 0;
var tank;
var squares = [];
var triangles = [];
var spawnedSquares = 2;
var spawnedTriangles = 2;
var initialS = 5;
var initialT = 2;
var maxShapes = 10;


function setup() {
	createCanvas(1000, 600);
	tank = new Tank();

	//create starting obstacles once
	initialSquares();
	initialTriangles();
}


function draw() {
	background(200);
	drawGrid();
	checkStage();
}


function checkStage() {
	//navigate stages of game
	if (stage == 0) menu();
	if (stage == 1) game();
	if (stage == 2) gameOver();
}


function menu() {
	updateSquares();
	updateTriangles();

	fill(66, 157, 206);
	textSize(120);
	textStyle(BOLD);
	stroke(0);
	strokeWeight(5);
	textFont('Calibri');
	text('Diep', 385, 290);
	textSize(30);
	fill(0);
	noStroke();
	text('Press Enter to Start', 380, 385);

	//press enter to play
	if (keyIsDown(13)) stage = 1;
}


function game() {
	spawnedSquares = 2;
	spawnedTriangles = 2;
	updateSquares();
	updateTriangles();

	tank.shoot();
	tank.display();
	tank.update();
	tank.move();
	checkTankDamage();

	gameInfo();
}

function gameOver() {
	//restart
	noStroke();
	fill(0);
	text('Press Enter to Restart', 365, 485);
	reset();

	//display game over
	fill(30, 120, 206);
	textSize(100);
	textStyle(BOLD);
	stroke(0);
	strokeWeight(5);
	textFont('Calibri');
	text('Game Over', 265, 290);
	textSize(30);

	//dispay score
	fill(29, 226, 105);
	strokeWeight(3);
	textSize(30);
	text('Score:', 435, 385);
	text(score, 535, 385);
}


function keyPressed() {
	//toggle autofire (press "e" to shoot without pressing mouse)
	if (keyCode === 69) {
		if (tank.autoFire == false) {
			tank.autoFire = true;
		}
		else if (tank.autoFire == true) {
			tank.autoFire = false;
		}
	}
}


function updateSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].display();
		squares[i].update();

		for (var j = 0; j < tank.bullets.length; j++) {

			if (tank.bullets.length > 0) {

				if (squares.length > 0) {

					tank.bullets[j].checkCollision(squares[i].pos.x, squares[i].pos.y);

					if (tank.bullets[j].hit == true) {
						squares[i].health -= 1;
						tank.bullets.splice(j, 1);
					}

					if (squares[i].health <= 0) {
						squares.splice(i, 1);
						score++;
						createSquares();
					}
				}
			}
		}
	}
}

//generate squares
function createSquares() {
	for (var i = 0; i < spawnedSquares; i++) {
		if (squares.length < maxShapes) {
			squares.push(new Square());
		}
	}
}

function initialSquares() {
	for (var i = 0; i < initialS; i++) {
		squares.push(new Square());
	}
}


function updateTriangles() {
	for (var i = 0; i < triangles.length; i++) {
		triangles[i].display();
		triangles[i].update();

		for (var j = 0; j < tank.bullets.length; j++) {

			if (tank.bullets.length > 0) {

				if (triangles.length > 0) {

					tank.bullets[j].checkCollision(triangles[i].pos.x, triangles[i].pos.y);

					if (tank.bullets[j].hit == true) {
						triangles[i].health -= 1;
						tank.bullets.splice(j, 1);
					}

					if (triangles[i].health <= 0) {
						triangles.splice(i, 1);
						score += 3;
						createTriangles();
					}
				}
			}
		}
	}
}

//generate triangles
function createTriangles() {
	for (var i = 0; i < spawnedTriangles; i++) {
		if (triangles.length < maxShapes) {
			triangles.push(new Triangle());
		}
	}
}

function initialTriangles() {
	for (var i = 0; i < initialT; i++) {
		triangles.push(new Triangle());
	}
}

function checkTankDamage() {
	//check collision with squares
	for (var i = 0; i < squares.length; i++) {
		tank.checkHealth(squares[i].pos.x, squares[i].pos.y, 1);
		if (tank.bodyDamage == true) {
			squares[i].health -= 1;
		}

		//update squares
		if (squares[i].health <= 0) {
			squares.splice(i, 1);
			score++;
			//spawn more squares as they are killed
			createSquares();
		}
	}

	//check collision with triangles
	for (var i = 0; i < triangles.length; i++) {
		tank.checkHealth(triangles[i].pos.x, triangles[i].pos.y, 2);
		if (tank.bodyDamage == true) {
			triangles[i].health -= 3;
		}

		//update triangles
		if (triangles[i].health <= 0) {
			triangles.splice(i, 1);
			score += 3;
			//spawn more triangles as they are killed
			createTriangles();
		}
	}
}

function reset() {
	spawnedSquares = 2;
	spawnedTriangles = 2;

	//reset bullets
	for (var i = 0; i < tank.bullets.length; i++) {
		tank.bullets.splice(i, 1);
	}

	//reset squares
	if (squares.length > 6) {
		for (var i = 0; i < squares.length; i++) {
			squares.splice(i, 1);
		}
	}

	//reset triangles
	if (triangles.length > 3) {
		for (var i = 0; i < triangles.length; i++) {
			triangles.splice(i, 1);
		}
	}

	//reset triangle health
	for (var i = 0; i < triangles.length; i++) {
		triangles[i].resetHealth();
	}

	//reset variables
	if (keyIsDown(13)) {
		stage = 1;
		score = 0;
		tank.health = 10;
		tank.pos.x = width / 2;
		tank.pos.y = height / 2;
		tank.vel.mult(0);
		tank.accel.mult(0);
	}
}

function gameInfo() {
	//display score
	fill(29, 226, 105);
	strokeWeight(3);
	stroke(0);
	textSize(30);
	text('Score:', 435, 585);
	text(score, 535, 585);

	//autofire indicator
	textSize(25);
	if (tank.autoFire == true) {
		fill(29, 226, 105);
		text('[e] Auto-Fire: On', 10, 35);
	}
	if (tank.autoFire == false) {
		fill(66, 157, 206);
		text('[e] Auto-Fire: Off', 10, 35);
	}
}

function drawGrid() {
	//background grid
	for (let i = 0; i < width / 50; i++) {
		for (let j = 0; j < height / 50; j++) {
			fill(200);
			stroke(180);
			strokeWeight(1.5)
			rect(i * 50, j * 50, 50, 50);
		}
	}

}