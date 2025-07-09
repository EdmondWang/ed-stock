// app/page.tsx
'use server'; // 启用服务端渲染

import { PriceTable } from '@/components/PriceTable';

export default async function Home() {
  // 服务端获取数据
  const res = await fetch('http://localhost:3000/api/eth-price');
  const data = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edmond Stock</h1>
      {data?.price ? (
        <PriceTable data={[{ coin: 'ETH', price: data.price, timestamp: data.timestamp }]} />
      ) : (
        <div className="error">Failed to load data, please retry after a bit of while</div>
      )}
    </div>
  );
}