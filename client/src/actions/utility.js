export const sortLogs = (logs) => {
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));

    return logs;
}