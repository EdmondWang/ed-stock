// app/components/PriceTable.tsx
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface PriceTableProps {
  data: Array<{
    coin: string;
    price: number;
    timestamp: string;
  }>;
}

export function PriceTable({ data = [] }: PriceTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Coin
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Update Time
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{item.coin}</td>
            <td className="px-6 py-4 whitespace-nowrap">${item.price.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss', { locale: enUS })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PriceTable;