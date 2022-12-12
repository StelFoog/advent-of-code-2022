/**
 * Reads input as string and passes it to the task which is to be performed
 *
 * Optionally it can also be set to read from an example file instead of the true input
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { setInput } from './inputManager';

const TASKS = 'tasks';
const INPUT_FILE = 'input.txt';
const EXAMPLE_FILE = 'example.txt';
const TASK_NAME_REGEX = /^(\d|1\d|2[0-5])-[12]$/;
const TASK_FILE_REGEX = /^(\d|1\d|2[0-5])-[12]\.[tj]s$/;
const [_node, _name, task = 'latest', useExampleInput = 'n'] = process.argv;

const file = ['y', 'Y', 'yes', 't', 'true'].includes(useExampleInput) ? EXAMPLE_FILE : INPUT_FILE;

const input = readFileSync(file).toString();
if (!input) {
	console.error(`${file} has no content`);
	process.exit(1);
}

setInput(trimInput(input));

await import(getTaskFile(task));

function trimInput(input: string) {
	let trailing: number;
	for (trailing = input.length; input[trailing - 1].match(/\s/); trailing--);
	return input.substring(0, trailing);
}

function getTaskFile(task: string) {
	if (!task.match(TASK_NAME_REGEX)) {
		const files = readdirSync(TASKS)
			.filter((name) => name.match(TASK_FILE_REGEX))
			.sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]));
		return path.join(process.cwd(), TASKS, files[files.length - 1]);
	}
	const predictedTsFileName = path.join(process.cwd(), TASKS, task + '.ts');
	if (existsSync(predictedTsFileName)) return predictedTsFileName;

	const predictedJsFileName = path.join(process.cwd(), TASKS, task + '.js');
	if (existsSync(predictedJsFileName)) return predictedJsFileName;

	console.error(
		`No file found with either of the expected names: ${predictedTsFileName} or ${predictedJsFileName}`
	);
	process.exit(1);
}
