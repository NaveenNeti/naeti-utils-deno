import { AmqpConnection, connect, type AmqpConnectOptions } from "https://deno.land/x/amqp@v0.23.1/mod.ts";

class RabbitMQClient {
    private client: AmqpConnection;

    constructor(client: AmqpConnection) {
        this.client = client;
    }

    static async getDefaultClient(): Promise<RabbitMQClient> {
        return new RabbitMQClient(await connect({
            hostname: Deno.env.get('RABBITMQ_HOST') || 'localhost',
            username: Deno.env.get('RABBITMQ_USER') || 'admin',
            password: Deno.env.get('RABBITMQ_PASS') || 'admin',
            vhost: Deno.env.get('RABBITMQ_VHOST') || '/',
            port: 5672,
        }));
    }

    static async getClientWithConfig(config: AmqpConnectOptions): Promise<RabbitMQClient> {
        return new RabbitMQClient(await connect(config));
    }

    getClient(): AmqpConnection {
        return this.client;
    }
}


export { RabbitMQClient };