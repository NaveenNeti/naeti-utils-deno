import { Duration } from "./duration.ts";
import { Optional } from "./optional.ts";

/**
 * Represents an instant in time.
 */
export class Instant {
  // The canonical representation of time is the number of milliseconds since the epoch.
  private epochMilli: number;

  /**
   * Private constructor.
   *
   * @param epochMilli The number of milliseconds since the epoch.
   */
  private constructor(epochMilli: number) {
    this.epochMilli = epochMilli;
  }

  /**
   * Returns the current instant.
   * @returns {Instant} The current instant.
   */
  static now(): Instant {
    return new Instant(Date.now());
  }

  /**
   * Creates an instant from the given epoch milliseconds.
   * @param {number} milli - The epoch milliseconds.
   * @returns {Instant} The instant.
   */
  static ofEpochMilli(milli: number): Instant {
    return new Instant(milli);
  }

  /**
   * Creates an instant from the given epoch seconds.
   * @param {number} seconds - The epoch seconds.
   * @returns {Instant} The instant.
   */
  static ofEpochSeconds(seconds: number): Instant {
    return new Instant(seconds * 1000);
  }

  /**
   * Returns the number of seconds since the epoch.
   * @returns {number} The epoch seconds.
   */
  getEpochSecond(): number {
    return Math.floor(this.epochMilli / 1000);
  }

  /**
   * Checks if this instant is after the specified instant.
   * @param {Instant} other - The other instant.
   * @returns {boolean} True if this instant is after the other instant, false otherwise.
   */
  isAfter(other: Instant): boolean {
    return this.epochMilli > other.epochMilli;
  }

  /**
   * Checks if this instant is before the specified instant.
   * @param {Instant} other - The other instant.
   * @returns {boolean} True if this instant is before the other instant, false otherwise.
   */
  isBefore(other: Instant): boolean {
    return this.epochMilli < other.epochMilli;
  }

  /**
   * Checks if this instant is equal to the specified instant.
   * @param {Instant} other - The other instant.
   * @returns {boolean} True if this instant is equal to the other instant, false otherwise.
   */
  isEqual(other: Instant): boolean {
    return this.epochMilli === other.epochMilli;
  }

  /**
   * Returns a new instant that is this instant minus the specified duration.
   * @param {Duration} duration - The duration to subtract.
   * @returns {Instant} The new instant.
   */
  minus(duration: Duration): Instant {
    return new Instant(this.epochMilli - duration.toMillis());
  }

  /**
   * Returns a new instant that is this instant plus the specified duration.
   * @param {Duration} duration - The duration to add.
   * @returns {Instant} The new instant.
   */
  plus(duration: Duration): Instant {
    return new Instant(this.epochMilli + duration.toMillis());
  }

  /**
   * Returns the duration between this instant and the other instant.
   * @param {Instant} other - The other instant to compare to
   * @returns {Duration} The duration between this instant and the other instant.
   */
  difference(other: Instant): Duration {
    return Duration.ofMillis(Math.abs(this.epochMilli - other.epochMilli));
  }

  /**
   * Checks if this instant is within the range of the other two instants.
   * It is non-inclusive of the upper bound and inclusive of the lower bound.
   *
   * @param {Instant} other - The other instant to compare to.
   * @param {Duration} range - The range to compare to.
   * @returns {boolean} True if this instant is within the range of the other two instants, false otherwise.
   */
  isWithinRange(other: Instant, range: Duration): boolean {
    if (
      this.isWithinUpperBound(other, range) &&
      this.isWithinLowerBound(other, range)
    ) {
      return true;
    }
    return false;
  }

  /**
   * Checks if instant is within the upper bound of this instant.
   * It is non-inclusive of the upper bound.
   *
   * @param {Instant} other - The other instant to compare to.
   * @param {Duration} range - The range to compare to.
   * @returns {boolean} True if this instant is within the upper bound, false otherwise.
   */
  isWithinUpperBound(other: Instant, range: Duration): boolean {
    const upperBound = this.plus(range);
    if (other.isBefore(upperBound)) {
      return true;
    }
    return false;
  }

  /**
   * Checks if instant is within the lower bound of this instant.
   * It is non-inclusive of the lower bound.
   *
   * @param {Instant} other - The other instant to compare to.
   * @param {Duration} range - The range to compare to.
   * @returns {boolean} True if this instant is within the upper bound, false otherwise.
   */
  isWithinLowerBound(other: Instant, range: Duration): boolean {
    const lowerBound = this.minus(range);
    if (other.isAfter(lowerBound)) {
      return true;
    }
    return false;
  }

  /**
   * Determines the closest instant from the set of instants.
   * Will return an empty Optional if the set is empty.
   *
   * @param instants The set of instants to compare to.
   * @returns
   */
  findClosestInstant(instants: Instant[]): Optional<Instant> {
    if (instants.length === 0) {
      return Optional.empty();
    }
    let closestInstant = instants[0];
    let closestDifference = this.difference(instants[0]);
    for (let i = 1; i < instants.length; i++) {
      const difference = this.difference(instants[i]);
      if (difference.isLessThan(closestDifference)) {
        closestInstant = instants[i];
        closestDifference = difference;
      }
    }
    return Optional.of(closestInstant);
  }

  /**
   * Returns the number of milliseconds since the epoch.
   *
   * @returns {Date} The date representation of this instant.
   */
  toDate(): Date {
    return new Date(this.epochMilli);
  }

  /**
   * Returns an instant from the given date.
   *
   * @param date The date.
   * @returns {Instant} The instant.
   */
  static fromDate(date: Date): Instant {
    return new Instant(date.getTime());
  }

  /**
   * Returns a friendly string representation of this instant.
   * @returns {string} The friendly string.
   */
  toFriendlyString(): string {
    const date = new Date(this.epochMilli);
    return date.toUTCString();
  }

  /**
   * Returns an instaant from the given ISO 8601 string.
   * @param {string} iso8601 - The ISO 8601 string.
   * @returns {Instant} The instant.
   */
  fromISO8601(iso8601: string): Instant {
    return new Instant(Date.parse(iso8601));
  }

  /**
   * Returns the ISO 8601 string representation of this instant.
   * @returns {string} The ISO 8601 string.
   */
  toISO8601(): string {
    return new Date(this.epochMilli).toISOString();
  }
}