import { input } from '../inputManager';

type Monkey = {
	items: number[];
	operation: (old: number) => number;
	test: number;
	throwTrue: number;
	throwFalse: number;
};

const monkeys: Monkey[] = [];

input.split('\n\n').map((monkeyIn) => {
	const [_none, startingItems, operation, test, throwTrue, throwFalse] = monkeyIn
		.split('\n')
		.map((line) => line.split(': ')[1]);

	const monkey: Partial<Monkey> = {};

	monkey.items = startingItems.split(', ').map(Number);
	const [_old, operator, param] = operation.substring(6).split(' ');
	monkey.operation = (old) => {
		const val = param === 'old' ? old : Number(param);
		return operator === '*' ? old * val : old + val;
	};
	monkey.test = Number(test.substring(13));
	monkey.throwTrue = Number(throwTrue.substring(16));
	monkey.throwFalse = Number(throwFalse.substring(16));

	monkeys.push(monkey as Monkey);
});

const inspectedItems = monkeys.map(() => 0);
for (let i = 0; i < 20; i++) {
	monkeys.forEach((monkey, index) => {
		monkey.items.forEach((item) => {
			item = Math.floor(monkey.operation(item) / 3);
			monkeys[item % monkey.test === 0 ? monkey.throwTrue : monkey.throwFalse].items.push(item);
		});
		inspectedItems[index] += monkey.items.length;
		monkey.items = [];
	});
}

const sortedMonkeyInspections = inspectedItems.sort((a, b) => b - a);

console.log(sortedMonkeyInspections[0] * sortedMonkeyInspections[1]);
