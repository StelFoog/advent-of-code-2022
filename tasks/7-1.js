const { input } = process.env;

let path = '';
const files = {};
const dirSizes = {};
const splitInput = input.split('\n').forEach((line) => {
	if (line.startsWith('$ cd')) {
		const newDir = line.split(' ')[2];
		if (newDir === '/') path = '';
		else if (newDir === '..') {
			const splitPath = path.split('/');
			splitPath.pop();
			path = splitPath.join('/');
		} else {
			path = [...path.split('/'), newDir].join('/');
		}
	} else if (line.startsWith('$ ls')) {
		// No need to do anythin
	} else if (line.startsWith('dir')) {
		const dirName = line.split(' ')[1];
		getNestedFiles(files, path)[dirName] = {};
	} else {
		const [size, name] = line.split(' ');
		getNestedFiles(files, path)[name] = Number(size);
	}
});

sizeOfDir(files, '');

console.log(
	Object.values(dirSizes)
		.filter((size) => size <= 100000)
		.reduce((prev, curr) => prev + curr)
);

function getNestedFiles(files, path) {
	const splitPath = path.split('/').filter(Boolean);
	let nestedFiles = files;
	splitPath.forEach((dir) => {
		nestedFiles = nestedFiles[dir];
	});

	return nestedFiles;
}

function sizeOfDir(dir, currentPath) {
	let size = 0;
	Object.entries(dir).forEach(([key, val]) => {
		if (typeof val === 'number') size += val;
		else size += sizeOfDir(val, [...currentPath.split('/').filter(Boolean), key].join('/'));
	});

	dirSizes[currentPath] = size;
	return size;
}
