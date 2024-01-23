import cron from 'node-cron';
import {currentTime, isoToCron} from "../../utils/time-handler";

// parallels, courseEvents
const kosSync = cron.schedule('*/30 * * * *', () => {
    console.log(currentTime(), 'Tato funkce se spustí každou půl hodinu');
});

// semester, then to DB -> schedule cron to start/end of semester
const semesterTask = (semesterTime: string) => cron.schedule(semesterTime, () => {
    console.log('Tato funkce se spustí začátkem semestru');
});



const initCrons = (semesterTriggerTime: Date) => {
    const cronDate = isoToCron(semesterTriggerTime)
    kosSync.start();
    semesterTask(cronDate).start();
}

export default initCrons
