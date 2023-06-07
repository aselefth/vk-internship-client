export function getAgeString(age: number | undefined) {
	const ageStr = String(age);

	switch (ageStr.at(-1)) {
		case '0':
			return `${ageStr} лет`;
		case '1':
			return `${ageStr} год`;
		case '2':
			return `${ageStr} года`;
		case '3':
			return `${ageStr} года`;
		case '4':
			return `${ageStr} года`;
		case '5':
			return `${ageStr} лет`;
		case '6':
			return `${ageStr} лет`;
		case '7':
			return `${ageStr} лет`;
		case '8':
			return `${ageStr} лет`;
		case '9':
			return `${ageStr} лет`;
		default:
			return ageStr + 'лет';
	}
}
