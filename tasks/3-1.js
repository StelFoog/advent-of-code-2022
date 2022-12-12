import { input } from '../inputManager';

let sum = 0;

input.split('\n').forEach((line) => {
	const comp1 = line.substring(0, line.length / 2);
	const comp2 = line.substring(line.length / 2);
	sum += priority(commonItem(comp1, comp2));
});

console.log(sum);

function commonItem(comp1, comp2) {
	for (const c in comp1.split('')) {
		if (comp2.includes(comp1[c])) return comp1[c];
	}
}

function priority(item) {
	if (item.match(/[A-Z]/)) return item.charCodeAt(0) - 38;
	return item.charCodeAt(0) - 96;
}
