import { RecordType, DateValueType } from "../../common/interfaces";
import moment from "moment";
moment.locale("de-DE");

export const createDateValueArray = (input: RecordType[]): DateValueType[] => {
  const dateValueArray = input.map((record: RecordType) => {
    return {
      value: record.value,
      date: new Date(record.recordedAt),
    };
  });
  const sortedDateValueArray = dateValueArray.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });
  return sortedDateValueArray.map(record => ({
    value: record.value,
    date: record.date.toISOString(),
  })) as DateValueType[];
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
