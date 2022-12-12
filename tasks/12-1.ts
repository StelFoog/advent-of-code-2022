import { input } from '../inputManager';

type Point = [number, number];

const map: number[][] = [];
let start: Point;
let end: Point;

input.split('\n').forEach((line, y) => {
	map[y] = [];
	for (let x = 0; x < line.length; x++) {
		const char = line[x];
		if (char === 'S') {
			start = [y, x];
			map[y][x] = 0;
			continue;
		}
		if (char === 'E') {
			end = [y, x];
			map[y][x] = 25;
			continue;
		}
		map[y][x] = char.charCodeAt(0) - 97;
	}
});

const visited = map.map((row) => row.map(() => -1));
visited[start[0]][start[1]] = 0;
let queue: Point[] = [[start[0], start[1]]];
while (queue.length) {
	const [y, x] = queue.shift();
	const height = map[y][x];
	const steps = visited[y][x];
	if (y === end[0] && x === end[1]) {
		console.log(steps);
		process.exit(0);
	}
	// console.log({ height, point: [y, x], steps, len: queue.length });

	// Up
	if (visited[y - 1]?.[x] === -1 && map[y - 1][x] - height <= 1) {
		visited[y - 1][x] = steps + 1;
		queue.push([y - 1, x]);
	}
	// Down
	if (visited[y + 1]?.[x] === -1 && map[y + 1][x] - height <= 1) {
		visited[y + 1][x] = steps + 1;
		queue.push([y + 1, x]);
	}
	// Left
	if (visited[y]?.[x - 1] === -1 && map[y][x - 1] - height <= 1) {
		visited[y][x - 1] = steps + 1;
		queue.push([y, x - 1]);
	}
	// Right
	if (visited[y]?.[x + 1] === -1 && map[y][x + 1] - height <= 1) {
		visited[y][x + 1] = steps + 1;
		queue.push([y, x + 1]);
	}
}
