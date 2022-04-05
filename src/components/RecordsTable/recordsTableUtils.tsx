import { DateValueType } from "@lib/dateUtil";
import { useMemo } from "react";
import {
  Column,
  ColumnInstance,
  MetaBase,
  TableToggleCommonProps,
} from "react-table";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";

export const createHeaderColumn: (
  allColumns: ColumnInstance<DateValueType>[],
  meta: MetaBase<DateValueType>
) => Column<DateValueType>[] = columns => [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    ),
    Cell: ({
      row,
    }: {
      row: { getToggleRowSelectedProps: () => TableToggleCommonProps };
    }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
    width: 50,
  },
  ...columns,
];

export const numberFormatter = new Intl.NumberFormat("de-DE");

export const createRecordsColumns = (): Column<DateValueType>[] =>
  useMemo(
    () => [
      {
        Header: "Datum (ISO)",
        accessor: "formattedDay",
        Cell: ({ value }) => value,
      },
      {
        Header: "Uhrzeit (ISO)",
        accessor: "formattedTime",
        Cell: ({ value }) => value,
      },
      {
        Header: "Wert",
        accessor: "value",
        Cell: ({ value }) => numberFormatter.format(value),
      },
    ],
    []
  );
