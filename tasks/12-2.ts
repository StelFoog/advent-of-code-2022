import { input } from '../inputManager';

type Point = [number, number];

const map: number[][] = [];
let end: Point;

input.split('\n').forEach((line, y) => {
	map[y] = [];
	for (let x = 0; x < line.length; x++) {
		const char = line[x];
		if (char === 'S') {
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

let shortest = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < map.length; i++) {
	for (let j = 0; j < map[i]?.length; i++) {
		if (map[i][j] !== 0) continue;

		const visited = map.map((row) => row.map(() => -1));
		visited[i][j] = 0;
		let queue: Point[] = [[i, j]];

		while (queue.length) {
			const [y, x] = queue.shift();
			const height = map[y][x];
			const steps = visited[y][x];
			if (y === end[0] && x === end[1]) {
				break;
			}

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

		if (shortest > visited[end[0]][end[1]]) shortest = visited[end[0]][end[1]];
	}
}

console.log(shortest);
