// app/api/btc-price/route.ts
import { NextResponse } from 'next/server';

const COIN_GECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const FAILED_REQUEST_ERROR = 'Failed to fetch BTC price from CoinGecko API';

export async function GET() {
  try {
    // 请求 BTC 价格数据
    const response = await fetch(
      `${COIN_GECKO_API}?ids=bitcoin&vs_currencies=usd`
    );

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON 数据
    const data = await response.json();
    const btcPrice = data.bitcoin.usd;

    // 返回结构化数据
    return NextResponse.json(
      {
        price: btcPrice,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(FAILED_REQUEST_ERROR, error);
    return NextResponse.json(
      { 
        error: FAILED_REQUEST_ERROR,
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}