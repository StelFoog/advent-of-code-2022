const { input } = process.env;

for (let i = 0; i + 3 < input.length; i++) {
	const s = input.substring(i, i + 4);

	const chars = {};
	let j;
	for (j = 0; j < s.length; j++) {
		if (chars[s.charAt(j)]) break;
		chars[s.charAt(j)] = true;
	}
	if (j === s.length) {
		console.log(i + 4);
		break;
	}
}
