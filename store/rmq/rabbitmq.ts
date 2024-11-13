import { AmqpConnection, connect, type AmqpConnectOptions } from "https://deno.land/x/amqp/mod.ts";

const client = await connect({
    hostname: Deno.env.get('RABBITMQ_HOST') || 'localhost',
    username: Deno.env.get('RABBITMQ_USER') || 'admin',
    password: Deno.env.get('RABBITMQ_PASS') || 'admin',
    vhost: Deno.env.get('RABBITMQ_VHOST') || '/',
    port: 5672,
});

class RabbitMQClient {
    private client: AmqpConnection;

    constructor(client: AmqpConnection) {
        this.client = client;
    }

    static getDefaultClient(): RabbitMQClient {
        return new RabbitMQClient(client);
    }

    static async getClientWithConfig(config: AmqpConnectOptions): Promise<RabbitMQClient> {
        return new RabbitMQClient(await connect(config));
    }

    getClient(): AmqpConnection {
        return this.client;
    }
}


export { RabbitMQClient };