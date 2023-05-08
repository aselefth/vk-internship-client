export function getDateString (date: string): string {
    const monthsToRus: Record<string, string> = {
        'Jan': 'января',
        'Feb': 'февраля',
        'Mar': 'марта',
        'Apr': 'апреля',
        'May': 'мая',
        'Jun': 'июня',
        'Jul': 'июля',
        'Aug': 'августа',
        'Sep': 'сентября',
        'Oct': 'октября',
        'Nov': 'ноября',
        'Dec': 'декабря'
    };
    const time = new Date(`${date}`).toTimeString().slice(0, 5);
    const dataArray = new Date(`${date}`).toDateString().split(' ').splice(1, 3);
    const day = `${dataArray[1]} ${monthsToRus[dataArray[0]]} ${dataArray[2]}`;

    return `${time} ${day}`;
}