import { KafkaConsumer } from './kafkaConsumer';
import { KafkaProducerRoutes } from './kafkaProducerRoutes';
import express from 'express';
import dotenv from 'dotenv';

class Server {
	private kafkaProducerRoutes: KafkaProducerRoutes;
	private kafkaConsumer: KafkaConsumer;
	private app: express.Application;

	constructor() {
		this.kafkaConsumer = new KafkaConsumer();
		this.kafkaProducerRoutes = new KafkaProducerRoutes();
		this.app = express();
		dotenv.config();
		this.config();
	}

	async config(): Promise<void> {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(this.kafkaProducerRoutes.router);
	}

	async start(): Promise<void> {
		const PORT = process.env.PORT || 3000;
		this.app.listen(PORT, () => {
			console.log(`Server started at http://localhost:${PORT}`);
		});
		await this.kafkaConsumer.run();
	}
}

new Server().start();
