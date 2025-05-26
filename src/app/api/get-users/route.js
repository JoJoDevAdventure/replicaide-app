import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_ERP_API_KEY;

  try {
    const res = await fetch('https://erp-data-api.onrender.com/users', {
      headers: {
        'accept': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!res.ok) {
      return new NextResponse(JSON.stringify({ error: 'Failed to fetch users' }), {
        status: res.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await res.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.error('❌ Error fetching users:', err);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}
