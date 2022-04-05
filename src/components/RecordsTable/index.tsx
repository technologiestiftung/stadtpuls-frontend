import { CSSProperties, FC, useCallback } from "react";
import { useTable, useRowSelect } from "react-table";
import { FixedSizeList } from "react-window";
import { DateValueType } from "@lib/dateUtil";
import { Button } from "@components/Button";
import {
  createHeaderColumn,
  createRecordsColumns,
  numberFormatter,
} from "./recordsTableUtils";

export interface RecordsTablePropsType {
  data: DateValueType[];
}

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
    hooks.visibleColumns.push(createHeaderColumn);
  });

  const RenderRow = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({ style })}
          role='row'
          className={[
            "tr font-mono",
            "grid grid-cols-[auto,1fr,1fr] justify-items-stretch",
            index % 2 === 0 ? "bg-white-dot-pattern" : "bg-white",
          ].join(" ")}
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
      <Button
        variant='dangerous'
        disabled={selectedFlatRows.length === 0}
        className={[
          "transition-opacity border border-error mb-4",
          selectedFlatRows.length > 0
            ? "opacity-100"
            : "opacity-0 pointer-events-none",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {numberFormatter.format(selectedFlatRows.length)}{" "}
        {selectedFlatRows.length === 1 ? "Wert" : "Werte"} löschen
      </Button>
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
                {...headerGroup.getHeaderGroupProps()}
                role='row'
                className='grid grid-cols-[auto,1fr,1fr]'
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
