import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export async function POST(req) {
  const { conferenceName } = await req.json();

  const conferences = await client.conferences.list({ friendlyName: conferenceName, status: 'in-progress' });
  if (conferences.length === 0) {
    return new Response(JSON.stringify({ error: 'No active conference found' }), { status: 404 });
  }

  const participants = await client.conferences(conferences[0].sid).participants.list();
  const aiParticipant = participants.find(p => p.label === 'AI' || p.to.includes('elevenlabs'));

  if (!aiParticipant) {
    return new Response(JSON.stringify({ error: 'AI participant not found' }), { status: 404 });
  }

  await client.conferences(conferences[0].sid)
    .participants(aiParticipant.callSid)
    .update({ muted: true });

  return new Response(JSON.stringify({ success: true }));
}