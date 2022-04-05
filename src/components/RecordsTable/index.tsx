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
import styles from "./RecordsTable.module.css";

export interface RecordsTablePropsType {
  data: DateValueType[];
  isEditable: boolean;
}

const tableHeight = 600;
const tableHeightClass = "max-h-[600px]";
const tableRowHeight = 48;

export const RecordsTable: FC<RecordsTablePropsType> = ({
  data,
  isEditable,
}) => {
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
            "grid justify-items-stretch",
            index % 2 === 0 ? "bg-white-dot-pattern" : "bg-white",
            isEditable ? "grid-cols-[auto,1fr,1fr,1fr]" : "grid-cols-3",
          ].join(" ")}
        >
          {row.cells.map((cell, i) => (
            <div
              {...cell.getCellProps()}
              role='cell'
              className={[
                "td text-left p-0 whitespace-nowrap",
                "grid items-center",
                styles.tableCell,
                i !== row.cells.length - 1 ? "border-r border-gray-200" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className='inline-block text-left px-4 font-normal max-w-full truncate'>
                {cell.render("Cell")}
              </span>
            </div>
          ))}
        </div>
      );
    },
    [prepareRow, rows, selectedFlatRows]
  );

  return (
    <>
      {isEditable && (
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
      )}
      <div
        className={`w-full overflow-auto border border-gray-200 relative ${tableHeightClass}`}
      >
        <div
          {...getTableProps()}
          className={`w-full border-collapse table-fixed block ${
            !isEditable ? styles.notEditableTable : ""
          }`}
          style={{ paddingTop: tableRowHeight }}
          role='table'
        >
          <div
            role='rowgroup'
            className='absolute top-0 bottom-auto block w-[max(100%,500px)] z-10'
          >
            {headerGroups.map(headerGroup => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                role='row'
                style={{ height: tableRowHeight }}
                className={`grid ${
                  isEditable ? "grid-cols-[auto,1fr,1fr,1fr]" : "grid-cols-3"
                }`}
              >
                {headerGroup.headers.map((column, i) => (
                  <div
                    role='cell'
                    className={`text-left p-0 whitespace-nowrap ${styles.tableCell}`}
                    {...column.getHeaderProps()}
                  >
                    <span
                      className={[
                        "h-full grid items-center",
                        "text-left font-headline text-lg",
                        "px-4 font-normal shadow",
                        "border-gray-200",
                        "border-b bg-white border-gray-200",
                        "max-w-full truncate",
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
            className='block w-[max(100%,500px)]'
          >
            <FixedSizeList
              height={tableHeight - tableRowHeight - 2} // -2 for border
              itemCount={rows.length}
              itemSize={tableRowHeight}
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
