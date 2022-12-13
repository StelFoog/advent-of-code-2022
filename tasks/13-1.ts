import { input } from '../inputManager';

type Packet = (number | Packet)[];

const packets = input
	.split('\n\n')
	.map((pair) => pair.split('\n').map((str) => JSON.parse(str) as Packet));

let outOfOrderPackets = 0;
packets.forEach((pair, index) => {
	if (isSorted(pair[0], pair[1]) !== false) outOfOrderPackets += index + 1;
});

console.log(outOfOrderPackets);

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
