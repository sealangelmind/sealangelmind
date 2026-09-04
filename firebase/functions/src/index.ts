import { onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';

export const notificationPush = onRequest((_req, res) => {
  res.json({ ok: true, service: 'firebase-notification', status: 'ready' });
});

export const scheduledCleanup = onSchedule('every 24 hours', async () => {
  // Cleanup policy is intentionally a placeholder until the Firebase project is connected.
});
