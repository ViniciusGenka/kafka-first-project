import { kafka } from './kafkaConfig';
import { Producer, Message, RecordMetadata } from 'kafkajs';

export class KafkaProducer {
	private producer: Producer;

	constructor() {
		this.producer = kafka.producer();
	}

	async send(topic: string, messages: Message[]): Promise<RecordMetadata[]> {
		await this.producer.connect();
		return this.producer.send({ topic, messages });
	}
}
