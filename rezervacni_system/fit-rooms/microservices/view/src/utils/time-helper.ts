

export const isToday = (dateObject: Date) => {
    const currentDate = new Date();
    return (
        dateObject.getFullYear() === currentDate.getFullYear() &&
        dateObject.getMonth() === currentDate.getMonth() &&
        dateObject.getDate() === currentDate.getDate()
    );
}

export const isRunningEvent = (from: Date, to: Date) => {
    const currentDate = new Date();
    return from < currentDate && to > currentDate;
}

export const formatDate = (date: Date, includeSeconds: boolean) => {

    const isoDate = new Date(date);
    const hour = isoDate.getHours().toString().padStart(2, '0');
    const minute = isoDate.getMinutes().toString().padStart(2, '0');
    const second = isoDate.getSeconds().toString().padStart(2, '0');

    return `${hour}:${minute}${includeSeconds ? `:${second}` : "" }`;
}
