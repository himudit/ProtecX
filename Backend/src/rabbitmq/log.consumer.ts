import { getChannel } from './connection';
import { QUEUES } from './queues';
import { ApiLogEvent } from './types';
import { ConsumeMessage } from 'amqplib';
import { prisma } from '../config/prisma';

/**
 * Starts the log consumer.
 * Call this once when your app boots.
 */
export async function startLogConsumer(): Promise<void> {
    try {
        const channel = await getChannel();

        await channel.assertQueue(QUEUES.API_LOGS, {
            durable: true,
        });

        console.log(`🟢 Log consumer started for queue: ${QUEUES.API_LOGS}`);

        await channel.consume(
            QUEUES.API_LOGS,
            async (msg: ConsumeMessage | null) => {
                if (!msg) return;

                try {
                    const data = JSON.parse(
                        msg.content.toString()
                    ) as ApiLogEvent;

                    // Validate data before processing
                    if (!data.projectId || !data.requestType) {
                        console.warn('⚠️ Received malformed log message:', data);
                        channel.ack(msg);
                        return;
                    }

                    await prisma.logs.create({
                        data: {
                            projectId: data.projectId,
                            providerId: data.providerId,
                            endpoint: data.endpoint,
                            requestType: data.requestType,
                            statusCode: data.statusCode,
                            message: data.message ?? '',
                            error: data.error,
                            createdAt: new Date(data.createdAt),
                        },
                    });

                    channel.ack(msg);
                } catch (error) {
                    console.error('❌ Failed to process log message:', error);

                    // Requeue once if it's a transient error (e.g. DB connection issue)
                    // But for now, we follow the previous logic of not requeuing to avoid loops
                    // unless we implement a dead letter queue or retry count.
                    channel.nack(msg, false, false);
                }
            },
            { noAck: false }
        );
    } catch (error) {
        console.error('❌ Failed to start log consumer:', error);
        // Important: retry starting consumer or alert
    }
}
