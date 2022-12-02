const { input } = process.env;

const theirRock = 'A',
	theirPaper = 'B',
	theirScissors = 'C';
const myRock = 'X',
	myPaper = 'Y',
	myScissors = 'Z';
const choiceScore = {
	[myRock]: 1,
	[myPaper]: 2,
	[myScissors]: 3,
};
const outcomeScore = {
	[theirRock]: {
		[myRock]: 3,
		[myPaper]: 6,
		[myScissors]: 0,
	},
	[theirPaper]: {
		[myRock]: 0,
		[myPaper]: 3,
		[myScissors]: 6,
	},
	[theirScissors]: {
		[myRock]: 6,
		[myPaper]: 0,
		[myScissors]: 3,
	},
};

let score = 0;
input.split('\n').forEach((line) => {
	const [theirs, mine] = line.split(' ');
	score += choiceScore[mine] + outcomeScore[theirs][mine];
});

console.log(score);
