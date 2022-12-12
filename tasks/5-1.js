import { input } from '../inputManager';

const [crates, steps] = input.split('\n\n');

const crateRows = crates.split('\n');
const createIndexes = crateRows.pop().split('   ');
const numberOfCreates = Number(createIndexes.pop());

const columns = Array.apply(null, Array(numberOfCreates)).map(() => []);

for (let i = crateRows.length; i > 0; i--) {
	const row = crateRows[i - 1];
	row.match(/....?/g).forEach((col, index) => {
		if (col.charAt(0) != ' ') columns[index].push(col.charAt(1));
	});
}

steps.split('\n').forEach((step) => {
	const [_sentance, num, from, to] = step.match(/^move (\d+) from (\d+) to (\d+)$/);
	for (let i = 0; i < num; i++) {
		columns[Number(to) - 1].push(columns[Number(from) - 1].pop());
	}
});

console.log(columns.map((col) => col[col.length - 1]).join(''));
