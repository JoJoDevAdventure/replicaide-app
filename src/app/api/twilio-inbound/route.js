// /app/api/twilio-inbound/route.ts
import { NextResponse } from 'next/server';
import { twiml } from 'twilio';

// Log any unhandled promise rejections (helps trace silent 500s)
process.on('unhandledRejection', reason => {
  console.error('🚨 Unhandled Promise Rejection:', reason);
});

const BRIDGE_WS_URL = 'wss://511dfc7c6ba8.ngrok.app/twilio-media'; // e.g. wss://vivid-goose.ngrok-free.app/twilio-media

export async function POST(req) {
  const startMs = Date.now();
  console.log('🔔 [/api/twilio-inbound] invoked');

  let params = {};

  try {
    const rawBody = await req.text();
    params = Object.fromEntries(new URLSearchParams(rawBody));
    console.log('📑 Twilio params →', params);
    console.log('🌐 Using bridge URL →', BRIDGE_WS_URL);
    if (!BRIDGE_WS_URL) {
      console.error('❌ BRIDGE_WS_URL is undefined – check env vars / ngrok!');
      return new NextResponse('<!-- missing BRIDGE_WS_URL -->', { status: 500 });
    }
  } catch (err) {
    console.error('⚠️  Could not parse Twilio body', err);
  }

  try {
    const vr = new twiml.VoiceResponse();

    /* 1️⃣  Pipe the caller’s audio to ElevenLabs */
    vr.start().stream({
      url: BRIDGE_WS_URL
    });

    /* 2️⃣  Put caller into the shared conference so listeners can join */
    vr.dial().conference('ai_room', {
      startConferenceOnEnter: true,
      endConferenceOnExit : true,
      waitUrl: ''  // no hold music
    });

    const xml = vr.toString();
    console.log('📤 TwiML sent →\n', xml);
    console.log(`⏱️  Handler latency: ${Date.now() - startMs} ms`);

    return new NextResponse(xml, {
      headers: { 'Content-Type': 'text/xml' }
    });

  } catch (err) {
    console.error('❌ Failed to build TwiML', err);
    return new NextResponse('<!-- TwiML generation error -->', { status: 500 });
  }
}