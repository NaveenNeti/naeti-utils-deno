import { Client as EsClient } from "https://deno.land/x/elasticsearch@v8.6.0/mod.ts";

interface ClientAuth {
    username?: string
    password?: string
    apiKey?: string
}

interface ClientOptions {
    node: string
    auth?: ClientAuth
}

const esClient = new EsClient({ node: 
    Deno.env.get('ELASTICSEARCH_URL') || 'http://localhost:9200' });

class ElasticsearchClient {
    private client: EsClient;

    constructor(client: EsClient) {
        this.client = client;
    }

    static getDefaultClient(): ElasticsearchClient {
        return new ElasticsearchClient(esClient);
    }

    static getClientWithConfig(config: ClientOptions): ElasticsearchClient {
        return new ElasticsearchClient(new EsClient(config));
    }

    getClient(): EsClient {
        return this.client;
    }
}

export { ElasticsearchClient };