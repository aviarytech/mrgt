export class Email {
    id;
    at;
    constructor(id, at) {
        this.id = id;
        this.at = at;
    }
    toString() {
        return `${this.id}@${this.at}`;
    }
}
