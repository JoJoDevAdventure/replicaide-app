import { NextResponse } from 'next/server';

const prompt1 = `
  Welcome back! We’re excited to help you again. Let's continue your property search where we left off.
  Please confirm or update any of your details if needed.
`;

const prompt2 = `
  Hello! I'm your real estate assistant from Vila Group. Let’s find your perfect home together.
  I’ll ask you a few questions to get started!
`;

export async function POST(req) {
  const bodyText = await req.text();
  console.log("📦 Incoming ElevenLabs Webhook Body:", bodyText);

  let phoneNumber = null;
  try {
    const parsed = JSON.parse(bodyText);
    phoneNumber = parsed?.caller?.phone_number || null;
    console.log("📞 Extracted phone number:", phoneNumber);
  } catch (err) {
    console.error("❌ Failed to parse webhook body:", err);
  }

  let userExists = false;

  if (phoneNumber) {
    try {
      const res = await fetch(`https://your-api.com/users?phone=${encodeURIComponent(phoneNumber)}`);
      const data = await res.json();
      console.log("🔍 Fetched user data:", data);

      if (data && data.exists) {
        userExists = true;
        console.log("✅ User exists in the database.");
      } else {
        console.log("🆕 No user found for this phone number.");
      }
    } catch (err) {
      console.error("❌ Error while checking user existence:", err);
    }
  }

  return NextResponse.json({
    dynamic_variables: {
      last_interaction: new Date().toISOString().split('T')[0],
    },
    conversation_config_override: {
      agent: {
        prompt: {
          prompt: userExists ? prompt1 : prompt2,
        },
        first_message: userExists
          ? "Welcome back! Ready to continue your home search?"
          : "Hello! I'm here to help you find your dream home. Let’s get started.",
      },
    },
  });
}