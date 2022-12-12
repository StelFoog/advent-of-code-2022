import { input } from '../inputManager';

let sum = 0;

const lines = input.split('\n');
for (let i = 0; i < lines.length; i += 3) {
	sum += priority(commonItem(lines[i], lines[i + 1], lines[i + 2]));
}

console.log(sum);

function commonItem(elf1, elf2, elf3) {
	for (const c in elf1.split('')) {
		if (elf2.includes(elf1[c]) && elf3.includes(elf1[c])) return elf1[c];
	}
}

function priority(item) {
	if (item.match(/[A-Z]/)) return item.charCodeAt(0) - 38;
	return item.charCodeAt(0) - 96;
}
