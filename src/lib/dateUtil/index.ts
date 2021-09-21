import { DateValueType } from "../../common/interfaces";
import moment from "moment";
import { definitions } from "@common/types/supabase";
moment.locale("de-DE");

export const createDateValueArray = (
  input: definitions["records"][]
): DateValueType[] => {
  const dateValueArray = input.map(({ measurements, recorded_at }) => ({
    value: (measurements && measurements[0]) || 0,
    date: recorded_at,
    time: new Date(recorded_at).getTime(),
  }));
  const sortedDateValueArray = dateValueArray.sort((a, b) => {
    return a.time - b.time;
  });
  return sortedDateValueArray as DateValueType[];
};

export const createTimeOutput = (input: Date): string => {
  const hours = input.getUTCHours();
  const minutes = input.getUTCMinutes();
  const seconds = input.getUTCSeconds();
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const formatDateFromNow = (date: Date): string => {
  const fromNowStr = moment(date).fromNow();
  return `${fromNowStr.charAt(0).toUpperCase()}${fromNowStr.slice(1)}`;
};
