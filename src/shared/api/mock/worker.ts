import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers';

export async function enableApiMock(): Promise<void> {
  const worker = setupWorker(...authHandlers);

  await worker.start({ onUnhandledRequest: 'bypass' });
}
