/**
 * Represents a duration of time in milliseconds.
 */
export class Duration {
    /**
     * Creates a new Duration instance with the specified number of milliseconds.
     * @param millis The number of milliseconds.
     */
    constructor(private readonly millis: number) {}
  
    /**
     * Creates a Duration instance with the specified number of milliseconds.
     * @param millis The number of milliseconds.
     * @returns A new Duration instance.
     */
    public static ofMillis(millis: number): Duration {
      if (millis < 0) {
        throw new Error("Duration must not be negative");
      }
      return new Duration(millis);
    }
  
    /**
     * Creates a Duration instance with the specified number of seconds.
     * @param seconds The number of seconds.
     * @returns A new Duration instance.
     */
    public static ofSeconds(seconds: number): Duration {
      return new Duration(seconds * 1000);
    }
  
    /**
     * Creates a Duration instance with the specified number of minutes.
     * @param minutes The number of minutes.
     * @returns A new Duration instance.
     */
    public static ofMinutes(minutes: number): Duration {
      return new Duration(minutes * 60 * 1000);
    }
  
    /**
     * Creates a Duration instance with the specified number of hours.
     * @param hours The number of hours.
     * @returns A new Duration instance.
     */
    public static ofHours(hours: number): Duration {
      return new Duration(hours * 60 * 60 * 1000);
    }
  
    /**
     * Creates a Duration instance with the specified number of days.
     * @param days  The number of days.
     * @returns
     */
    public static ofDays(days: number): Duration {
      return new Duration(days * 24 * 60 * 60 * 1000);
    }
  
    /**
     * Returns the number of milliseconds in this Duration.
     * @returns The number of milliseconds.
     */
    public toMillis(): number {
      return this.millis;
    }
  
    /**
     * Returns the number of seconds in this Duration.
     * @returns The number of seconds.
     */
    public toSeconds(): number {
      return this.millis / 1000;
    }
  
    /**
     * Returns the number of minutes in this Duration.
     * @returns The number of minutes.
     */
    public toMinutes(): number {
      return this.millis / 1000 / 60;
    }
  
    /**
     * Returns the number of hours in this Duration.
     * @returns The number of hours.
     */
    public toHours(): number {
      return this.millis / 1000 / 60 / 60;
    }
  
    /**
     * Returns the number of days in this Duration.
     * @returns The number of days.
     */
    public toDays(): number {
      return this.millis / 1000 / 60 / 60 / 24;
    }
  
    /**
     * Checks if this Duration is greater than or equal to the specified Duration.
     * @param other The other Duration to compare.
     * @returns True if this Duration is greater than or equal to the other Duration, false otherwise.
     */
    public isGreaterThanOrEqual(other: Duration): boolean {
      return this.millis >= other.millis;
    }
  
    /**
     * Adds the specified Duration to this Duration.
     * @param other The Duration to add.
     * @returns A new Duration instance representing the sum of the two Durations.
     */
    public plus(other: Duration): Duration {
      return new Duration(this.millis + other.millis);
    }
  
    /**
     * Subtracts the specified Duration from this Duration.
     * @param other The Duration to subtract.
     * @returns A new Duration instance representing the difference between the two Durations.
     */
    public minus(other: Duration): Duration {
      return new Duration(this.millis - other.millis);
    }
  
    /**
     * Checks if this Duration is equal to the specified Duration.
     * @param other The other Duration to compare.
     * @returns True if this Duration is equal to the other Duration, false otherwise.
     */
    public isEquals(other: Duration): boolean {
      return this.millis === other.millis;
    }
  
    /**
     * Checks if this Duration is less than the specified Duration.
     * @param other The other Duration to compare.
     * @returns True if this Duration is less than the other Duration, false otherwise.
     */
    public isLessThan(other: Duration): boolean {
      return this.millis < other.millis;
    }
  }
  