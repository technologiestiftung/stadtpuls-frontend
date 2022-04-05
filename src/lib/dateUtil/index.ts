import moment from "moment";
import "moment/locale/de";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
moment.locale("de-DE");

export interface DateValueType {
  id: number;
  value: number;
  date: string;
}

export const createDateValueArray = (
  input: Pick<definitions["records"], "id" | "recorded_at" | "measurements">[]
): DateValueType[] => {
  const dateValueArray = input.map(({ id, measurements, recorded_at }) => ({
    id,
    value: measurements && measurements.length >= 1 ? measurements[0] : 0,
    date: moment.parseZone(recorded_at),
  }));
  const sortedDateValueArray = dateValueArray.sort((a, b) => {
    return a.date.valueOf() - b.date.valueOf();
  });
  return sortedDateValueArray.map(d => ({
    ...d,
    date: d.date.toISOString(),
  }));
};

export const formatDateFromNow = (date: Date): string => {
  const fromNowStr = moment.parseZone(date).fromNow();
  return `${fromNowStr.charAt(0).toUpperCase()}${fromNowStr.slice(1)}`;
};
