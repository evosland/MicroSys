
// @ts-ignore
import { Error, isNull, isNullOrEmpty } from "../mod.ts";


/**
 *  This class is loosely based on the .NET StringBuilder class.  It allows for concatenating
 *   large strings efficiently.
 *
 *  @file StringBuilder is used to efficiently join many strings together.
 *  @author Shawn Bullock <http://github.com/evosland>
 *  @version 1.0.0
 *  @license MIT
 *
 *  @see https://github.com/evosland/nonstd
 *
 */

/**
 *  Used to efficiently join many strings together.
 *
 *  @class
 */
export class StringBuilder {
  private _values: string[] = [];
  private _maxCapacity: number = (1024**3); // 1 GB
  private _capacity: number = (1024**2 * 100); // 100 MB


  /**
   * Creates the instance of StringBuilder.
   *
   * @param {StringBuilder} value - Start from the output of another StringBuilder.
   * @param {string} value - Start with an initial string if applicable.
   * @memberOf StringBuilder
   *
   */
  constructor(value?: StringBuilder | string | number) {
    this._values = new Array<string>();

    if (!isNullOrEmpty(value)) {
      if (typeof value === "number" && value >= 0) {
        this._maxCapacity = value;
        this.capacity = value;
      }
      else if (typeof value === "string") {
        this._values.push(value as string);
      }
      else if (value instanceof StringBuilder) {
        this._values.push(value.toString());
      }
    }

    return this;
  }

  private ensureCapacity(value: string | number | StringBuilder): boolean {
    if (typeof value === 'number') {
      value = String(value);
    }

    return (this.length + value.length <= this._capacity);
  }


  public append(value: string | number | StringBuilder) : StringBuilder {
    if (typeof value === 'number') {
      value = String(value);
    }

    if (!this.ensureCapacity(value)) {
      throw new Error.InsufficientResourcesError("There is not enough capacity to complete this operation.");
    }

    if (typeof value === "string") {
      this._values.push(value);
    }

    if (typeof value === "number") {
      this._values.push(value as string);
    }

    if (value instanceof StringBuilder) {
      this._values.push(value.toString());
    }

    return this;
  }

  public appendLine(value: string | number | StringBuilder) : StringBuilder {
    if (typeof value === "number") {
      value = String(value);
    }

    return this.append(value + "\n");
  }

  public clear(count?: number): StringBuilder {
    if (!isNullOrEmpty(count) && count as number > 0) {
      for ( ; count as number > 0; (count as number)--) {
        this._values.pop();
      }
    }
    else {
      this._values = [];
    }

    return this;
  }

  public toString(): string {
    return this._values.join("");
  }


  public get length(): number {
    let length = 0;
    for (let x of this._values) {
      length += x.length;
    }
    return length;
  }


  public set capacity(capacity: number) {
    if (isNull(capacity) || capacity <= 0) {
      throw new Error.ArgumentError("Capacity must be a valid positive integer.");
    }

    if (capacity < this.length) {
      throw new Error.OutOfRangeError("Cannot set capacity less than current length.");
    }
    else if (capacity > this._maxCapacity) {
      throw new Error.OutOfRangeError(`Cannot set capacity more than maxCapacity of: ${this._maxCapacity} bytes.`);
    }
    else {
      this._capacity = capacity;
    }
  }

  public get capacity(): number {
    return this._capacity;
  }

  public get maxCapacity(): number {
    return this._maxCapacity;
  }

  public get fragments(): number {
    return this._values.length;
  }
}


