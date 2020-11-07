export const sortLogs = (logs) => {
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));

    return logs;
}

export const formatNumber = number => {
    let numSplit, int, dec;

    number = Math.abs(number);
    number = number.toFixed(2);

    numSplit = number.split('.');

    int = numSplit[0];

    if (int.length > 3) {

        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];

    return int + '.' + dec;
};

export const limitTitle = (title, limit = 25) => {
    const newTitle = [];

    const formatedTitle = title.slice(0, 1).toUpperCase() + title.slice(1, title.length).toLowerCase();

    if (formatedTitle.length > limit) {
        formatedTitle.split(' ').reduce((acc, current) => {
            if (acc + current.length <= limit) {
                newTitle.push(current);
            }
            return acc + current.length;
        }, 0);

        return `${newTitle.join(' ')} ...`
    }

    return formatedTitle;
}