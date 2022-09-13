import { strongHash } from '../hash/strong-hash';
import { workerData, parentPort, isMainThread, Worker } from 'worker_threads';

export const strongHashAsync = async (input: string): Promise<string> => {
  const worker = new Worker(__filename, {
    workerData: input,
  });
  return new Promise((resolve) => worker.on('message', resolve));
};

if (!isMainThread) {
  const input = workerData as string;

  const hash = strongHash(input);

  parentPort.postMessage(hash);
}
