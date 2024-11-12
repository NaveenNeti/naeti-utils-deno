import { Client as ElasticsearchClient  } from "https://deno.land/x/elasticsearch@v8.6.0/mod.ts";

const esClient = new ElasticsearchClient({ node: 
    Deno.env.get('ELASTICSEARCH_URL') || 'http://localhost:9200' });

export default esClient;