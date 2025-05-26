import crypto from 'crypto';
import { NextResponse } from 'next/server';

const WEBHOOK_SECRET = 'wsec_9dcab579dd6638446897d92b0fcd68997177005105c3429fb7ddd71a81da3d97';

export async function POST(req) {
  const headers = req.headers['ElevenLabs-Signature'].split(',');
  const timestamp = headers.find((e) => e.startsWith('t=')).substring(2);
  const signature = headers.find((e) => e.startsWith('v0='));

  // Validate timestamp
  const reqTimestamp = timestamp * 1000;
  const tolerance = Date.now() - 30 * 60 * 1000;
  if (reqTimestamp < tolerance) {
    res.status(403).send('Request expired');
    return;
  } else {

    // Validate hash
    const message = `${timestamp}.${req.body}`;
    const digest = 'v0=' + crypto.createHmac('sha256', WEBHOOK_SECRET).update(message).digest('hex');
    if (signature !== digest) {
      res.status(401).send('Request unauthorized');
      return;
    }
  }

  try {
    const parsed = JSON.parse(bodyText);
    const messages = parsed?.messages || [];
    const transcript = parsed?.transcript || "";

    console.log("🗒️ Messages:", messages);
    console.log("📝 Transcript:", transcript);
    console.log("🔄 Processing call and saving call to DB...");

  } catch (error) {
    console.error("❌ Failed to parse call-ended webhook body:", error);
  }

  return NextResponse.json({ received: true });
}