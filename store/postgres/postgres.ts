import { Client as PgClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

/** 
 * PostgreSQL client configuration 
 * @type {PgClient}
 */
const client = new PgClient({
    user: Deno.env.get('DB_USER') || 'postgres',
    password: Deno.env.get('DB_PASS') || 'postgres',
    database: Deno.env.get('DB_NAME') || 'postgres',
    hostname: Deno.env.get('DB_HOST') || 'localhost',
    port: 5432,
  });
  
  /**
   * PostgresClient class to manage connections and transactions using generator functions.
   */
  class PostgresClient {
      private client: PgClient;
  
      /**
       * Initializes the PostgresClient with a configured PgClient instance.
       * @param {PgClient} client - The PgClient instance for PostgreSQL interactions.
       */
      constructor(client: PgClient) {
          this.client = client;
      }
  
      /**
       * Manages a database connection lifecycle using a generator function.
       * @template T
       * @param {(client: PgClient) => Promise<T>} callback - The function to execute with a database connection.
       * @yields {Promise<T>} Executes the callback within a connected client context.
       * @returns {Promise<T>} - The result of the callback function.
       */
      async *withConnection<T>(callback: (client: PgClient) => Promise<T>): AsyncGenerator<T> {
          await this.client.connect();
          try {
              yield await callback(this.client);
          } finally {
              await this.client.end();
          }
      }
  
      /**
       * Manages a transaction lifecycle using a generator function.
       * Begins a transaction, executes the callback, and commits or rolls back based on success or failure.
       * @template T
       * @param {(client: PgClient) => Promise<T>} callback - The function to execute within a transaction.
       * @yields {Promise<T>} Executes the callback within a transaction context.
       * @returns {Promise<T>} - The result of the callback function.
       */
      async *withTransaction<T>(callback: (client: PgClient) => Promise<T>): AsyncGenerator<T> {
          await this.client.connect();
          const transaction = this.client.createTransaction('transaction');
          await transaction.begin();
          try {
              yield await callback(this.client);
              await transaction.commit();
          } catch (error) {
              await transaction.rollback();
              throw error;
          } finally {
              await this.client.end();
          }
      }
  
      /**
       * Returns the configured PgClient instance.
       * @returns {PgClient} The PgClient instance used by PostgresClient.
       */
      getClient(): PgClient {
          return this.client;
      }
  
      /**
       * Creates a PostgresClient instance with the default configuration.
       * @static
       * @returns {PostgresClient} A PostgresClient instance with default settings.
       */
      static getDefaultClient(): PostgresClient {
          return new PostgresClient(client);
      }
  
      /**
       * Creates a PostgresClient instance with custom configuration.
       * @static
       * @param {object} config - Configuration object for the PgClient.
       * @param {string} config.user - Database user.
       * @param {string} config.password - Database password.
       * @param {string} config.database - Database name.
       * @param {string} config.hostname - Database hostname.
       * @param {number} config.port - Database port.
       * @returns {PostgresClient} A PostgresClient instance with the provided configuration.
       */
      static getClientWithConfig(config: {
          user: string;
          password: string;
          database: string;
          hostname: string;
          port: number;
      }): PostgresClient {
          const customClient = new PgClient(config);
          return new PostgresClient(customClient);
      }
  }
  
  export { PostgresClient };
  export default client;
  