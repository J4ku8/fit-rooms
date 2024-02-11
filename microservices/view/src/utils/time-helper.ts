

export const isToday = (dateObject: Date) => {
    const currentDate = new Date();
    console.log(dateObject)
    return (
        dateObject.getFullYear() === currentDate.getFullYear() &&
        dateObject.getMonth() === currentDate.getMonth() &&
        dateObject.getDate() === currentDate.getDate()
    );
}

export const todayDate = () =>{
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
