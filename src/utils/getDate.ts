export function getDateString (date: string): string {
    const monthsToRus: Record<string, string> = {
        'Jan': 'янв.',
        'Feb': 'фев.',
        'Mar': 'мар.',
        'Apr': 'апр.',
        'May': 'мая',
        'Jun': 'июн.',
        'Jul': 'июл.',
        'Aug': 'авг.',
        'Sep': 'сен.',
        'Oct': 'окт.',
        'Nov': 'нояб.',
        'Dec': 'дек.'
    };
    const time = new Date(`${date}`).toTimeString().slice(0, 5);
    const dataArray = new Date(`${date}`).toDateString().split(' ').splice(1, 3);
    const day = `${dataArray[1]} ${monthsToRus[dataArray[0]]} ${dataArray[2]}`;

    return `${time} ${day}`;
}