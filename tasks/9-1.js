import { input } from '../inputManager';

const visited = { '0.0': true };
let head = '0.0';
let tail = '0.0';

input.split('\n').forEach((line) => {
	const command = line.split(' ');
	const dir = command[0];
	const steps = Number(command[1]);
	for (let i = 0; i < steps; i++) {
		const [x, y] = head.split('.').map(Number);
		let newHead = [x, y];
		if (dir === 'U') newHead = [x, y + 1];
		if (dir === 'D') newHead = [x, y - 1];
		if (dir === 'L') newHead = [x - 1, y];
		if (dir === 'R') newHead = [x + 1, y];
		updateTail(newHead);
		head = newHead[0] + '.' + newHead[1];
	}
});

console.log(Object.keys(visited).length);

function updateTail([headX, headY]) {
	const [tailX, tailY] = tail.split('.').map(Number);
	if (Math.abs(headX - tailX) <= 1 && Math.abs(headY - tailY) <= 1) return;

	tail = head;
	visited[head] = true;
}
