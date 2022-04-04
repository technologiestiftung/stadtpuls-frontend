import { FC, forwardRef, useEffect, useMemo, useRef } from "react";
import {
  useTable,
  useRowSelect,
  Column,
  TableToggleCommonProps,
} from "react-table";
import { DateValueType } from "@lib/dateUtil";

interface RecordsTablePropsType {
  data: DateValueType[];
}

const numberFormatter = new Intl.NumberFormat("de-DE");

function createRecordsColumns(): Column<DateValueType>[] {
  return useMemo(
    () => [
      {
        Header: "Datum und Uhrzeit (ISO)",
        accessor: "date",
        Cell: ({ value }) => value.format("DD. MMM YYYY - HH:mm:ss"),
      },
      {
        Header: "Wert",
        accessor: "value",
        Cell: ({ value }) => numberFormatter.format(value),
      },
    ],
    []
  );
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  TableToggleCommonProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    if (!resolvedRef || !("current" in resolvedRef) || !resolvedRef?.current)
      return;
    resolvedRef.current.indeterminate = !!indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  );
});

export const RecordsTable: FC<RecordsTablePropsType> = ({ data }) => {
  const columns = createRecordsColumns();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
  } = useTable({ columns, data }, useRowSelect, hooks => {
    hooks.visibleColumns.push(columns => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({
          row,
        }: {
          row: { getToggleRowSelectedProps: () => TableToggleCommonProps };
        }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  });
  return (
    <>
      {selectedFlatRows.length > 0 && <button>Delete selected rows</button>}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
