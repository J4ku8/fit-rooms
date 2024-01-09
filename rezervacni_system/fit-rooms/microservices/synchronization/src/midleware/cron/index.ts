import cron from 'node-cron';

// teachers timetable, parallels, courseEvents
const every5MinutesTask = cron.schedule('*/5 * * * *', () => {
    console.log('Tato funkce se spustí každých 5 minut');
});

// semester, then to DB
const monthlyTask = cron.schedule('0 0 1 * *', () => {
    console.log('Tato funkce se spustí jednou za měsíc');
});

// employees, then to DB
const dailyTask = cron.schedule('0 2 * * *', () => {
    console.log('Tato funkce se spustí jednou za týden (v neděli)');
});



const initCrons = () => {
    every5MinutesTask.start();
    monthlyTask.start();
    dailyTask.start();
}

export default initCrons
