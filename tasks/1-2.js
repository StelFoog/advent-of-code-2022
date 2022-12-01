const { input } = process.env;

const evlesInventories = input.split('\n\n').map((inv) => inv.split('\n').map(Number));

let topThree = [0, 0, 0];

evlesInventories.forEach((inv) => {
	const calories = inv.reduce((prev, curr) => prev + curr, 0);
	addToTop(calories);
});

console.log(topThree[0] + topThree[1] + topThree[2]);

function addToTop(val) {
	for (let i = 0; i < 3; i++) {
		if (val > topThree[i]) {
			topThree.splice(i, 0, val);
			topThree.pop();
			return;
		}
	}
}
