import { jwt } from 'twilio';

const { AccessToken } = jwt;
const { VoiceGrant } = AccessToken;

export async function GET() {
  const twilioAccountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
  const twilioApiKey = process.env.NEXT_PUBLIC_TWILIO_API_KEY;
  const twilioApiSecret = process.env.NEXT_PUBLIC_TWILIO_API_SECRET;

  const identity = 'browser-user';

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.NEXT_PUBLIC_TWILIO_TWIML_APP_SID,
    incomingAllow: true,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );

  token.addGrant(voiceGrant);

  return new Response(
    JSON.stringify({ token: token.toJwt() }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}