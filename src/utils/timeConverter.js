export function timeConverter(timestamp) {
    const minutes = Math.floor((Date.now() - timestamp) / 1000 / 60);

    const a = new Date(Number(timestamp));
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();

    if (minutes > 525600) {
        return date + " " + month + " " + year;
    } else if (minutes > 1440) {
        return date + " " + month;
    } else if (minutes > 30) {
        return (
            (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min)
        );
    } else if (minutes > 10) {
        return "30 минут назад";
    } else if (minutes > 5) {
        return "10 минут назад";
    } else if (minutes > 1) {
        return "5 минут назад";
    }
    return "1 минуту назад";
}
