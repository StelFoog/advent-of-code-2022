/**
 * Reads input as string and passes it to the task which is to be performed
 *
 * Optionally it can also be set to read from an example file instead of the true input
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';

const TASKS = 'tasks';
const INPUT_FILE = 'input.txt';
const EXAMPLE_FILE = 'example.txt';
const TASK_NAME_REGEX = /^(\d|1\d|2[0-5])-[12]\.js$/;
const [_node, _name, task = 'latest', useExampleInput = 'n'] = process.argv;

const file = ['y', 'Y', 'yes', 't', 'true'].includes(useExampleInput) ? EXAMPLE_FILE : INPUT_FILE;

const input = readFileSync(file).toString();

process.env.input = trimInput(input);

import(getTaskFile(task));

/**
 * @param {string} input
 */
function trimInput(input) {
	let leading, trailing;
	for (leading = 0; input[leading].match(/\s/); leading++);
	for (trailing = input.length; input[trailing - 1].match(/\s/); trailing--);
	return input.substring(leading, trailing);
}

/**
 * @param {string} task
 */
function getTaskFile(task) {
	if (!`${task}.js`.match(TASK_NAME_REGEX)) {
		const files = readdirSync(TASKS)
			.filter((name) => name.match(TASK_NAME_REGEX))
			.sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]));
		return path.join(process.cwd(), TASKS, files[files.length - 1]);
	}
	const predictedFileName = path.join(process.cwd(), TASKS, task + '.js');
	if (!existsSync(predictedFileName)) {
		console.error(`No file found with the expected name: ${predictedFileName}`);
		process.exit(1);
	}
	return predictedFileName;
}
