/** @format */

var pos = 0 + 'px';
const pacArray = [
	['./images/PacMan1.png', './images/PacMan2.png'],
	['./images/PacMan3.png', './images/PacMan4.png'],
];

const pacMan = [];

let isPaused = false;
let timeoutId;
function startTimeout() {
	timeoutId = setTimeout(move, 150);
}

function setToRandom(scale) {
	return {
		x: Math.random() * scale,
		y: Math.random() * scale,
	};
}
// Factory to make a PacMan
function makePac() {
	// Add image to div id = game
	let game = document.getElementById('game');
	let gameRect = game.getBoundingClientRect();
	let position = setToRandom(250);
	let newImg = document.createElement('img');
	newImg.style.position = 'absolute';
	newImg.src = './images/PacMan1.png';
	newImg.width = 100;
	newImg.style.left = position.x + gameRect.left;
	position.x = position.x + gameRect.left;
	newImg.style.top = position.y + gameRect.top;
	position.y = position.y + gameRect.top;

	// direction variable defines what direction should PacMan go into:
	// 0 = left to right
	// 1 = right to left (reverse)
	let direction = 0;

	// focus variable determine which PacMan image should be displayed. It flips between values 0 and 1
	let focus = 1;
	game.appendChild(newImg);
	const velocity = {
		x: 33,
		y: 27,
	};
	// new style of creating an object
	let pacManItem = {
		position,
		velocity,
		newImg,
		direction,
		focus,
	};

	return pacManItem;
}

function move() {
	clearTimeout(timeoutId);
	if (!isPaused) {
		//loop over pacMan array and move each one and move image in DOM
		for (let i = 0; i < pacMan.length; i++) {
			const item = pacMan[i];
			checkCollisions(item);

			item.focus = (item.focus + 1) % 2;

			item.newImg.src = pacArray[item.direction][item.focus];

			item.position.x += item.velocity.x;
			item.position.y += item.velocity.y;

			item.newImg.style.left = item.position.x;
			item.newImg.style.top = item.position.y;
		}
		startTimeout();
	}
}

function checkCollisions(item) {
	let game = document.getElementById('game');
	let gameRect = game.getBoundingClientRect();
	// collision with right edge
	if (item.position.x + item.velocity.x + item.newImg.width > gameRect.right) {
		item.velocity.x = -item.velocity.x;
		item.direction = 1;
	}
	// collision with left edge
	if (item.position.x + item.velocity.x < gameRect.left) {
		item.velocity.x = -item.velocity.x;
		item.direction = 0;
	}
	// collision with top and bottom edges
	if (
		item.position.y + item.velocity.y + item.newImg.height > gameRect.bottom ||
		item.position.y + item.velocity.y < gameRect.top
	) {
		item.velocity.y = -item.velocity.y;
	}
}
function togglePause() {
	isPaused = !isPaused; // Toggle the pause state
	if (!isPaused) {
		// If unpaused, call move() to resume movement
		move();
	}
}
function reset() {
	location.reload();
}

function makeOne() {
	pacMan.push(makePac()); // add a new PacMan
}
