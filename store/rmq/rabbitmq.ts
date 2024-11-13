import { connect } from "https://deno.land/x/amqp/mod.ts";

const client = await connect({
    hostname: Deno.env.get('RABBITMQ_HOST') || 'localhost',
    username: Deno.env.get('RABBITMQ_USER') || 'admin',
    password: Deno.env.get('RABBITMQ_PASS') || 'admin',
    vhost: Deno.env.get('RABBITMQ_VHOST') || '/',
    port: 5672,
});

export default client;