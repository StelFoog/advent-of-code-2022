import { input } from '../inputManager';

const grid = input.split('\n').map((line) => line.split('').map(Number));

let visibleTrees = grid.length * 2 + (grid[0].length - 2) * 2;
for (let y = 1; y < grid.length - 1; y++) {
	for (let x = 1; x < grid[y].length - 1; x++) {
		if (isVisible(x, y)) visibleTrees++;
	}
}

console.log(visibleTrees);

function isVisible(x, y) {
	const h = grid[y][x];
	if (Math.max(...grid[y].slice(0, x)) < h) return true;
	if (Math.max(...grid[y].slice(x + 1)) < h) return true;

	const col = grid.map((row) => row[x]);
	if (Math.max(...col.slice(0, y)) < h) return true;
	if (Math.max(...col.slice(y + 1)) < h) return true;

	return false;
}
