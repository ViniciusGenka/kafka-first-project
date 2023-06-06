import { KafkaProducer } from './kafkaProducer';
import { Message } from 'kafkajs';
import { NextFunction, Request, Response } from 'express';

export default class KafkaProducerController {
	private kafkaProducer: KafkaProducer;

	constructor() {
		this.kafkaProducer = new KafkaProducer();
	}

	send = async (req: Request, res: Response, next: NextFunction) => {
		const topicName = req.params.topic;
		const messages: Message[] = req.body.messages;
		await this.kafkaProducer.send(topicName, messages);
		res.status(200).end();
	};
}
