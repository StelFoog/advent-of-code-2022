import { input } from '../inputManager';

type Packet = (number | Packet)[];

const packets = input
	.split('\n')
	.filter((v) => !!v)
	.map((str) => JSON.parse(str) as Packet);

const div1 = [[2]],
	div2 = [[6]];
const sorted = [...packets, div1, div2]
	.sort((a, b) => {
		switch (isSorted(a, b)) {
			case true:
				return 1;
			case false:
				return -1;
			default:
				return 0;
		}
	})
	.reverse();

const div1Index = sorted.findIndex((p) => p === div1);
const div2Index = sorted.findIndex((p) => p === div2);
console.log((div1Index + 1) * (div2Index + 1));

function isSorted(left: Packet, right: Packet): boolean | null {
	let i: number;
	for (i = 0; i < left.length; i++) {
		const leftVal = left[i],
			rightVal = right[i];
		if (leftVal === undefined) return true;
		if (rightVal === undefined) return false;
		if (Array.isArray(leftVal) || Array.isArray(rightVal)) {
			const res = isSorted(
				Array.isArray(leftVal) ? leftVal : [leftVal],
				Array.isArray(rightVal) ? rightVal : [rightVal]
			);
			if (res !== null) return res;
		}
		if (leftVal > rightVal) return false;
		if (leftVal < rightVal) return true;
	}

	return null;
}
