import moment from "moment";
import "moment/locale/de";
import { DateValueType } from "@common/interfaces";
moment.locale("de-DE");

export interface ExtendedDateValueType extends DateValueType {
  formattedDay: string;
  formattedTime: string;
  dateISOString: string;
}

export const createDateValueArray = (
  input: DateValueType[]
): ExtendedDateValueType[] => {
  const dateValueArray = input.map(({ id, value, date }) => {
    const dateMoment = moment.parseZone(date);
    return {
      id,
      value,
      date: dateMoment.toDate(),
      dateISOString: dateMoment.toISOString(),
      formattedDay: dateMoment.format("DD. MMM YYYY"),
      formattedTime: dateMoment.format("HH:mm:ss"),
    };
  });
  const sortedDateValueArray = dateValueArray.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });
  return sortedDateValueArray;
};

export const formatDateFromNow = (date: Date): string => {
  const fromNowStr = moment.parseZone(date).fromNow();
  return `${fromNowStr.charAt(0).toUpperCase()}${fromNowStr.slice(1)}`;
};
