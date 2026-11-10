import { loadSchedulePayload } from '@/data/sources/live/load-schedule-payload';

export async function GET(): Promise<Response> {
  const payload = await loadSchedulePayload(
    process.env.PANDASCORE_TOKEN?.trim()
  );

  return Response.json(payload, {
    status: payload.status === 'error' ? 502 : 200,
  });
}
