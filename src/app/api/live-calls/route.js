import twilio from 'twilio';

const client = twilio(process.env.NEXT_PUBLIC_TWILIO_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH);

export async function GET() {
  try {
    const calls = await client.calls.list({ status: 'in-progress', limit: 20 });

    const formatted = calls.map(call => ({
      sid: call.sid,
      from: call.from,
      to: call.to,
      startTime: call.startTime,
      status: call.status,
      direction: call.direction,
    }));

    return new Response(JSON.stringify(formatted), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching live calls:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch live calls' }),
      { status: 500 }
    );
  }
}
