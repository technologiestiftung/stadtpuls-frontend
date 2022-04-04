import {
  CSSProperties,
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  useTable,
  useRowSelect,
  Column,
  TableToggleCommonProps,
} from "react-table";
import { FixedSizeList } from "react-window";
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
      <input
        type='checkbox'
        ref={resolvedRef}
        {...rest}
        className='m-0 -translate-y-0.5'
      />
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
    ]);
  });

  const RenderRow = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({ style })}
          role='row'
          className='tr font-mono odd:bg-white-dot-pattern even:bg-white grid grid-cols-[auto,1fr,1fr] justify-items-stretch'
        >
          {row.cells.map((cell, i) => {
            return (
              <div
                {...cell.getCellProps()}
                role='cell'
                className={[
                  "td text-left p-0 whitespace-nowrap",
                  "grid items-center",
                  i !== row.cells.length - 1 ? "border-r border-gray-200" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className='inline-block text-left px-4 font-normal'>
                  {cell.render("Cell")}
                </span>
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows, selectedFlatRows]
  );

  return (
    <>
      {selectedFlatRows.length > 0 && <button>Delete selected rows</button>}
      <div className='w-full overflow-auto border border-gray-200 relative max-h-[600px]'>
        <div
          {...getTableProps()}
          className='w-full border-collapse table-fixed block'
          role='table'
        >
          <div
            role='rowgroup'
            className='sticky top-0 bottom-auto block w-full z-10'
          >
            {headerGroups.map(headerGroup => (
              <div
                role='row'
                className='grid grid-cols-[auto,1fr,1fr]'
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, i) => (
                  <div
                    role='cell'
                    className={`text-left p-0 whitespace-nowrap`}
                    {...column.getHeaderProps()}
                  >
                    <span
                      className={[
                        "block",
                        "text-left font-headline text-lg",
                        "py-3 px-4 font-normal shadow",
                        "border-gray-200",
                        "border-b bg-white border-gray-200",
                        i !== headerGroup.headers.length - 1 ? "border-r" : "",
                      ].join(" ")}
                    >
                      {column.render("Header")}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            role='rowgroup'
            {...getTableBodyProps()}
            className='block w-full'
          >
            <FixedSizeList
              height={600}
              itemCount={rows.length}
              itemSize={48}
              width='100%'
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>
      </div>
    </>
  );
};
