import { Email } from "./Email.js";

export class Curator {
  constructor(public name: string, public email: Email) {}

  toString(): string {
    return `${this.name} ${this.email.toString()}`;
  }
}
