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
        width: 50,
      },
      ...columns,
    ]);
  });
  return (
    <>
      {selectedFlatRows.length > 0 && <button>Delete selected rows</button>}
      <div className='w-full overflow-auto border border-gray-200 relative max-h-[600px]'>
        <table
          {...getTableProps()}
          className='w-full border-collapse table-fixed block'
        >
          <thead className='sticky top-0 bottom-auto block w-full z-10'>
            {headerGroups.map(headerGroup => (
              <tr
                className='grid grid-cols-[auto,1fr,1fr]'
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map(column => (
                  <th
                    className={`text-left p-0 whitespace-nowrap`}
                    {...column.getHeaderProps()}
                    colSpan={undefined}
                  >
                    <span
                      className={[
                        "block",
                        "text-left font-headline text-lg",
                        "py-3 px-4 font-normal shadow",
                        "border-r border-gray-200",
                        "border-b bg-white border-gray-200",
                      ].join(" ")}
                    >
                      {column.render("Header")}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='block w-full'>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className='font-mono odd:bg-white-dot-pattern even:bg-white grid grid-cols-[auto,1fr,1fr]'
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`text-left p-0 whitespace-nowrap`}
                      >
                        <span
                          className={[
                            "block text-left",
                            "py-3 px-4 font-normal",
                            "border-r border-gray-200",
                          ].join(" ")}
                        >
                          {cell.render("Cell")}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
