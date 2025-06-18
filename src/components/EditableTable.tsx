import { useMemo } from 'react';
import { useTable } from 'react-table';

interface Props {
  data: any[];
  columns: any[];
}

export default function EditableTable({ data, columns }: Props) {
  const memoData = useMemo(() => data, [data]);
  const memoCols = useMemo(() => columns, [columns]);
  const tableInstance = useTable({ columns: memoCols, data: memoData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()} className="min-w-full text-sm text-left">
      <thead className="bg-gray-100">
        {headerGroups.map(group => (
          <tr {...group.getHeaderGroupProps()}>
            {group.headers.map(column => (
              <th {...column.getHeaderProps()} className="p-2 font-semibold">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border-b last:border-b-0">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="p-2">{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
