export const isoToCron = (isoDate: Date) => {
  const date = new Date(isoDate);

  const cronMinutes = '0';
  const cronHours = '1'; // Hodina po půlnoci
  const cronDay = date.getUTCDate() + 1; // Následující den
  const cronMonth = date.getUTCMonth() + 1; // Měsíce jsou indexované od 0

  const cronFormat = `${cronMinutes} ${cronHours} ${cronDay} ${cronMonth} *`;

  return cronFormat;
};

export const currentTime = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Měsíce jsou indexované od 0
  const currentDay = currentDate.getDate();

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSecond = currentDate.getSeconds();
  return `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}:${currentSecond}`;
};

export const findDayFromDate = (from: Date, dayOfTheWeek: number) => {
  const d = new Date(dayOfTheWeek);
  const actualDay = d.getDay();
  const diff = (dayOfTheWeek - actualDay + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
};

export const assignTimeToDate = (date: Date, time: string): Date => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date;
};

export const getYearMonthDay = (date: Date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
