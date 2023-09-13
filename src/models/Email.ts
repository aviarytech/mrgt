export class Email {
  constructor(public id: string, public at: string) {}

  toString(): string {
    return `${this.id}@${this.at}`;
  }
}