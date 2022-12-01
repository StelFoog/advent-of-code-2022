const { input } = process.env;

const evlesInventories = input.split('\n\n').map((inv) => inv.split('\n').map(Number));

let max = 0;

evlesInventories.forEach((inv) => {
	const calories = inv.reduce((prev, curr) => prev + curr, 0);
	if (calories > max) max = calories;
});

console.log(max);
