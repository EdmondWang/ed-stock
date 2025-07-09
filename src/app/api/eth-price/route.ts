import { NextResponse } from 'next/server';

const COIN_GECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const FAILED_REQUEST_ERROR = 'Failed to fetch ETH price from CoinGecko API';

export async function GET() {
  try {
    const response = await fetch(`${COIN_GECKO_API}?ids=ethereum&vs_currencies=usd`);
    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    const ethPrice = data.ethereum.usd;

    return NextResponse.json({ 
      price: ethPrice,
      timestamp: new Date().toISOString() 
    }, { status: 200 });
  } catch (error) {
    console.error(FAILED_REQUEST_ERROR, error);
    return NextResponse.json({ error: FAILED_REQUEST_ERROR }, { status: 500 });
  }
}