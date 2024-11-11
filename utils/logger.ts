import * as winston from "npm:winston@3.17.0";

/**
 * Enum representing different log levels.
 */
export enum LogLevel {
  TRACE = 4,
  DEBUG = 3,
  INFO = 2,
  WARN = 1,
  ERROR = 0,
}

/**
 * Retrieves the log level from the environment variable LOG_LEVEL.
 * If the environment variable is not set or the value is invalid, it returns the default log level INFO.
 * @returns The log level.
 */
const getLogLevelFromEnv = (): LogLevel => {
  const envLogLevel = Deno.env.get('LOG_LEVEL');

  if (envLogLevel) {
    const level = LogLevel[envLogLevel.toUpperCase() as keyof typeof LogLevel];
    if (level !== undefined) {
      return level;
    }
  }
  return LogLevel.INFO;
};

/**
 * Logger instance that uses Winston for logging.
 */
export const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
  },
  level: LogLevel[getLogLevelFromEnv()].toLowerCase(),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

/**
 * Base class for loggable objects.
 */
export class Loggable {
  private currentLogLevel: LogLevel;

  constructor() {
    this.currentLogLevel = getLogLevelFromEnv();
  }

  /**
   * Logs a message with the current log level.
   * @param message - The message to log.
   */
  protected log(message: string): void {
    this.logWithLevel(this.currentLogLevel, message);
  }

  /**
   * Logs a message with the DEBUG log level.
   * @param message - The message to log.
   */
  protected debug(message: string): void {
    this.logWithLevel(LogLevel.DEBUG, message);
  }

  /**
   * Logs a message with the TRACE log level.
   * @param message - The message to log.
   */
  protected trace(message: string): void {
    this.logWithLevel(LogLevel.TRACE, message);
  }

  /**
   * Logs a message with the INFO log level.
   * @param message - The message to log.
   */
  protected info(message: string): void {
    this.logWithLevel(LogLevel.INFO, message);
  }

  /**
   * Logs a message with the WARN log level.
   * @param message - The message to log.
   */
  protected warn(message: string): void {
    this.logWithLevel(LogLevel.WARN, message);
  }

  /**
   * Logs a message with the ERROR log level.
   * @param message - The message to log.
   */
  protected error(message: string): void {
    this.logWithLevel(LogLevel.ERROR, message);
  }

  /**
   * Logs a message with the specified log level.
   * @param level - The log level.
   * @param message - The message to log.
   */
  protected logWithLevel(level: LogLevel, message: string): void {
    logger.log(LogLevel[level].toString().toLowerCase(), message);
  }
}
