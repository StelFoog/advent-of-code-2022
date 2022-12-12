import { input } from '../inputManager';

const crt = Array.from(Array(40 * 6));

let ticks = 0,
	x = 1;
input.split('\n').forEach((command) => {
	cycle();
	if (command === 'noop') return;

	cycle();
	x += Number(command.split(' ')[1]);
});

draw();

function cycle() {
	const crtRow = Math.floor(ticks / 40);
	if (Math.abs(ticks - (x + 40 * crtRow)) > 1) crt[ticks] = '.';
	else crt[ticks] = '#';
	ticks++;
}

function draw() {
	for (let i = 0; i < crt.length; i++) {
		Bun.write(Bun.stdout, crt[i]);
		if ((i + 1) % 40 === 0) console.log();
	}
}
