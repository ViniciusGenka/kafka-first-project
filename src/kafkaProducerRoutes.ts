import KafkaProducerController from './kafkaProducerController';
import { Router } from 'express';

export class KafkaProducerRoutes {
	public router: Router;
	public kafkaProducerController: KafkaProducerController;

	constructor() {
		this.router = Router();
		this.kafkaProducerController = new KafkaProducerController();
		this.config();
	}

	private async config(): Promise<void> {
		this.router.post('/send/:topic', this.kafkaProducerController.send);
	}
}
