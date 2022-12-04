const { input } = process.env;

let sum = 0;

input.split('\n').forEach((line) => {
	const [section1, section2] = line.split(',').map((section) => section.split('-').map(Number));
	if (section1[1] >= section2[0] && section2[1] >= section1[0]) sum++;
});

console.log(sum);
