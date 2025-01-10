import { DateTime } from 'luxon';

const getDateTime = (date: Date, format: string): string => {
	return DateTime.fromJSDate(new Date(date)).toFormat(format);
};

export default getDateTime;
