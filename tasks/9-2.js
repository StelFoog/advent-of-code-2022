const { input } = process.env;

const visited = { '0.0': true };
let head = '0.0';
let tail = Array.from(Array(9)).map(() => '0.0');

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

function updateTail(newHead) {
	const newTail = tail.map((v) => v.split('.').map(Number));
	for (let i = 0; i < tail.length; i++) {
		const [prevX, prevY] = i === 0 ? newHead : newTail[i - 1];
		const [tailX, tailY] = tail[i].split('.').map(Number);
		if (Math.abs(prevX - tailX) <= 1 && Math.abs(prevY - tailY) <= 1) break;

		if (prevX > tailX) newTail[i][0]++;
		else if (prevX < tailX) newTail[i][0]--;
		if (prevY > tailY) newTail[i][1]++;
		else if (prevY < tailY) newTail[i][1]--;
	}

	visited[newTail[newTail.length - 1].join('.')] = true;
	tail = newTail.map((v) => v.join('.'));
}
