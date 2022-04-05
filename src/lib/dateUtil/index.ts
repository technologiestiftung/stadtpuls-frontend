import moment from "moment";
import "moment/locale/de";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
moment.locale("de-DE");

export interface DateValueType {
  id: number;
  value: number;
  formattedDay: string;
  formattedTime: string;
  date: Date;
  dateISOString: string;
}

export const createDateValueArray = (
  input: Pick<definitions["records"], "id" | "recorded_at" | "measurements">[]
): DateValueType[] => {
  const dateValueArray = input.map(({ id, measurements, recorded_at }) => {
    const dateMoment = moment.parseZone(recorded_at);
    return {
      id,
      value: measurements && measurements.length >= 1 ? measurements[0] : 0,
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
