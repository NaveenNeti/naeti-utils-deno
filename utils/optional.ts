/**
 * Represents an optional value that may or may not be present.
 * @template T - The type of the optional value.
 */
export class Optional<T> {
    private value: T | undefined | null;
  
    /**
     * Checks if a value is null or undefined.
     * @param value - The value to check.
     * @returns True if the value is null or undefined, false otherwise.
     */
    private isNullOrUndefined<T>(value: T | undefined | null): boolean {
      return value === undefined || value === null;
    }
  
    /**
     * Constructs an Optional instance with the given value.
     * @param value - The optional value.
     */
    private constructor(value: T | undefined | null) {
      this.value = value;
    }
  
    /**
     * Creates an Optional instance with the given value.
     * @param value - The optional value.
     * @returns An Optional instance.
     */
    public static of<T>(value: T | undefined | null): Optional<T> {
      return new Optional(value);
    }
  
    /**
     * Creates an empty Optional instance.
     * @returns An empty Optional instance.
     */
    public static empty<T>(): Optional<T> {
      return new Optional<T>(undefined);
    }
  
    /**
     * Checks if the optional value is present.
     * @returns True if the optional value is present, false otherwise.
     */
    public isPresent(): boolean {
      return this.isNullOrUndefined(this.value) === false;
    }
  
    /**
     * Retrieves the optional value.
     * @throws Error if the optional value is not present.
     * @returns The optional value.
     */
    public get(): T {
      if (this.isNullOrUndefined(this.value)) {
        throw new Error("Value is not present");
      }
      return this.value!;
    }
  
    /**
     * Returns the optional value if present, otherwise returns the specified value.
     * @param other - The value to return if the optional value is not present.
     * @returns The optional value if present, otherwise the specified value.
     */
    public orElse(other: T): T {
      if (this.isNullOrUndefined(this.value)) {
        return other;
      }
      return this.value!;
    }
  
    /**
     * Returns the optional value if present, otherwise throws the specified error.
     * @param throws - The function that throws the error if the optional value is not present.
     * @returns The optional value if present.
     */
    public orElseThrow(throws: () => void): T {
      if (this.isNullOrUndefined(this.value)) {
        throws();
      }
      return this.value!;
    }
  
    /**
     * Returns the optional value if present, otherwise returns the result of the specified function.
     * @param other - The function that provides the value if the optional value is not present.
     * @returns The optional value if present, otherwise the result of the specified function.
     */
    public orElseGet(other: () => T): T {
      if (this.isNullOrUndefined(this.value)) {
        return other();
      }
      return this.value!;
    }
  
    /**
     * Performs the specified action on the optional value if present.
     * @param consumer - The function to perform on the optional value.
     */
    public ifPresent(consumer: (value: T) => void): void {
      if (!this.isNullOrUndefined(this.value)) {
        consumer(this.value!);
      }
    }
  
    /**
     * Transforms the optional value using the specified mapper function.
     * @template U - The type of the transformed value.
     * @param mapper - The function to transform the optional value.
     * @returns An Optional instance with the transformed value if the optional value is present, otherwise an empty Optional instance.
     */
    public map<U>(mapper: (value: T) => U): Optional<U> {
      if (this.isNullOrUndefined(this.value)) {
        return Optional.empty();
      }
      return Optional.of(mapper(this.value!));
    }
  
    /**
     * Filters the optional value using the specified predicate function.
     * @param predicate - The function to test the optional value.
     * @returns An Optional instance with the filtered value if the optional value is present and passes the predicate, otherwise an empty Optional instance.
     */
    public filter(predicate: (value: T) => boolean): Optional<T> {
      if (this.isNullOrUndefined(this.value) || !predicate(this.value!)) {
        return Optional.empty();
      }
      return Optional.of(this.value);
    }
  }
  