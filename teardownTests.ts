import prisma from './src/services/prisma';
import client from './src/models/connection/redis';

const tearDown = async () => {
  try {
    await prisma.$disconnect();

    await new Promise<void>((resolve) => {
      client.quit(() => {
          resolve();
      });
    });
    // redis.quit() creates a thread to close the connection.
    // We wait until all threads have been run once to ensure the connection closes.
    await new Promise(resolve => setImmediate(resolve));
  } catch (e) { }
};

module.exports = tearDown
