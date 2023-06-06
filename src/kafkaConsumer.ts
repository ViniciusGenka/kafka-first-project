import { kafka } from './kafkaConfig';
import { Consumer } from 'kafkajs';

export class KafkaConsumer {
	private topicName: string;
	private groupId: string;
	private consumer: Consumer;

	constructor() {
		this.topicName = 'first-topic';
		this.groupId = 'group-1';
		this.consumer = kafka.consumer({ groupId: this.groupId });
	}

	async run(): Promise<void> {
		await this.consumer.connect();
		await this.consumer.subscribe({
			topic: this.topicName,
			fromBeginning: true,
		});
		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log({
					topic,
					partition,
					offset: message.offset,
					value: message?.value?.toString(),
				});
			},
		});
	}
}
