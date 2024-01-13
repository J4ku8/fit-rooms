

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

export const isPast = (to: Date) => {
    const currentDate = new Date();
    return to < currentDate
}
