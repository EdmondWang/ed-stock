// app/page.tsx
'use server'; // 启用服务端渲染

import { PriceTable } from '@/components/PriceTable';

export default async function Home() {
  // 服务端获取数据
  const [ethRes, btcRes] = await Promise.all([
    fetch('http://localhost:3000/api/eth-price'),
    fetch('http://localhost:3000/api/btc-price')
  ]);
  
  const ethData = await ethRes.json();
  const btcData = await btcRes.json();
  
  const priceData = [];
  if (ethData?.price) {
    priceData.push({ coin: 'ETH', price: ethData.price, timestamp: ethData.timestamp });
  }
  if (btcData?.price) {
    priceData.push({ coin: 'BTC', price: btcData.price, timestamp: btcData.timestamp });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edmond Stock</h1>
      {priceData.length > 0 ? (
        <PriceTable data={priceData} />
      ) : (
        <div className="error">Failed to load data, please retry after a bit of while</div>
      )}
    </div>
  );
}