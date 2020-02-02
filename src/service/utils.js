export function formatDateTime(timeStamp) {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDay() + 1;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`
}

