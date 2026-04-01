interface Column {
  key: string;
  title: string;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
}

export default function DataTable({ columns, data, isLoading }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col gap-4 mt-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-dark-bg/50 rounded-lg w-full"></div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 bg-dark-surface/50 rounded-2xl border border-white/5 mt-6 text-dark-text-muted">
        Nenhum registro encontrado.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6 rounded-xl border border-white/5">
      <table className="w-full text-left bg-dark-surface">
        <thead className="bg-dark-bg/50 text-xs uppercase text-dark-text-muted tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 font-medium">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
