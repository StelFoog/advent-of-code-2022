import { input } from '../inputManager';

const theirRock = 'A',
	theirPaper = 'B',
	theirScissors = 'C';
const lose = 'X',
	draw = 'Y',
	win = 'Z';
const outcomeScore = {
	[lose]: 0,
	[draw]: 3,
	[win]: 6,
};
const choiceScore = {
	[theirRock]: {
		[draw]: 1,
		[win]: 2,
		[lose]: 3,
	},
	[theirPaper]: {
		[lose]: 1,
		[draw]: 2,
		[win]: 3,
	},
	[theirScissors]: {
		[win]: 1,
		[lose]: 2,
		[draw]: 3,
	},
};

let score = 0;
input.split('\n').forEach((line) => {
	const [theirs, mine] = line.split(' ');
	score += choiceScore[theirs][mine] + outcomeScore[mine];
});

console.log(score);
