

import { NextResponse } from 'next/server';

export async function POST(req) {
  const bodyText = await req.text();
  console.log("📞 Call Ended Webhook Body:", bodyText);

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

//wsec_18b312cce5294bfa93148ae96d46a658f6da77a0c021e714bbc859713fcdc776