import { input } from '../inputManager';

let ticks = 0,
	x = 1,
	signalSum = 0;
input.split('\n').forEach((command) => {
	cycle();
	if (command === 'noop') return;

	cycle();
	x += Number(command.split(' ')[1]);
});

console.log(signalSum);

function cycle() {
	ticks++;
	if ((ticks + 20) % 40 === 0) {
		signalSum += ticks * x;
	}
}
