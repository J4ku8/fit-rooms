import moment from "moment-timezone";

export const getCurrentDate = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return moment().tz(timezone).toDate()
}

export const isToday = (dateObject: Date) => {
    const currentDate = getCurrentDate()
    return (
        dateObject.getFullYear() === currentDate.getFullYear() &&
        dateObject.getMonth() === currentDate.getMonth() &&
        dateObject.getDate() === currentDate.getDate()
    );
}

const getDate = (date: Date) => {
    return `${date.getFullYear()}-${Number(date.getMonth()) + 1}-${date.getDate()}`
}
export const thisMonthRange = () => {
    const currentDate = getCurrentDate()
    currentDate.setDate(1)
    const start = new Date(currentDate)
    currentDate.setMonth(currentDate.getMonth() + 1);
    const end = new Date(currentDate.setDate(0));
    return {
        end: getDate(end), start: getDate(start)
    }
}

export const todayDate = () =>{
    const today = getCurrentDate()

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const isRunningEvent = (from: Date, to: Date) => {
    const currentDate = getCurrentDate()
    return from < currentDate && to > currentDate;
}

export const formatDate = (date: Date, includeSeconds: boolean) => {
    const isoDate = new Date(date);
    const hour = isoDate.getHours().toString().padStart(2, '0');
    const minute = isoDate.getMinutes().toString().padStart(2, '0');
    const second = isoDate.getSeconds().toString().padStart(2, '0');

    return `${hour}:${minute}${includeSeconds ? `:${second}` : "" }`;
}
