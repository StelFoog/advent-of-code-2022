import { input } from '../inputManager';

const grid = input.split('\n').map((line) => line.split('').map(Number));

let highScore = -1;
for (let y = 1; y < grid.length - 1; y++) {
	for (let x = 1; x < grid[y].length - 1; x++) {
		const score = scenicScore(x, y);
		if (score > highScore) highScore = score;
	}
}

console.log(highScore);

function scenicScore(x, y) {
	const h = grid[y][x];
	let top, left, right, bottom;
	for (top = 1; true; top++) {
		if (grid[y - top][x] >= h) break;
		if (y - top <= 0) break;
	}
	for (bottom = 1; true; bottom++) {
		if (grid[y + bottom][x] >= h) break;
		if (y + bottom >= grid.length - 1) break;
	}

	for (left = 1; true; left++) {
		if (grid[y][x - left] >= h) break;
		if (x - left <= 0) break;
	}
	for (right = 1; true; right++) {
		if (grid[y][x + right] >= h) break;
		if (x + right >= grid[y].length - 1) break;
	}

	return top * left * right * bottom;
}
