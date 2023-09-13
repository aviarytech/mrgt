import { log } from "./Report.js";
import { Glossary } from "./Glossary.js";
import path, { resolve } from "path";
import { glob } from "glob";
import fs from "fs";
import Handlebars from "handlebars";
export class Generator {
    method;
    scopedir;
    inputGlob;
    outputName;
    glossary;
    entries;
    htmlOutput;
    constructor({ method, scopedir, input, output, }) {
        this.entries = [];
        this.method = method;
        this.scopedir = scopedir;
        this.inputGlob = input;
        this.outputName = output;
        log.info(`Using ${this.method} method with MRG ${this.inputGlob ?? "(from SAF scope.mrgfile)"} generating to ${this.outputName} in scopedir ${this.scopedir}`);
    }
    async generate() {
        try {
            this.createGlossary();
            await this.processGlossaryData();
            await this.generateHTML();
            await this.writeToFile();
            log.info("Generation completed successfully");
            return "Generation completed successfully";
        }
        catch (error) {
            log.error("Generation failed: ", error);
            throw new Error("Generation failed");
        }
    }
    createGlossary() {
        this.glossary = new Glossary({
            scopedir: resolve(this.scopedir),
            input: this.inputGlob,
        });
    }
    async processGlossaryData() {
        let outputs = [];
        if (this.inputGlob) {
            const files = await glob(this.inputGlob);
            for (let i = 0; i < files.length; i++) {
                outputs.push(await this.glossary.initialize(files[0]));
            }
        }
        else {
            outputs.push(await this.glossary.initialize(null));
        }
        this.entries = outputs.flatMap((o) => {
            return o.entries;
        });
        console.log(outputs);
    }
    async generateHTML() {
        try {
            const templateFile = fs.readFileSync("./assets/hrg-template.mustache", "utf8");
            console.log(this.entries);
            const template = Handlebars.compile(templateFile);
            this.htmlOutput = template({ entries: this.entries });
        }
        catch (error) {
            log.error("Failed to generate HTML", error);
        }
    }
    async writeToFile() {
        const name = `${this.outputName}.html`;
        try {
            await fs.promises.writeFile(path.join(this.scopedir, name), this.htmlOutput, "utf8");
            log.info(`Data successfully written to ${name}`);
        }
        catch (error) {
            log.error(`Failed to write data to file at ${name}`, error);
            throw new Error("File write operation failed");
        }
    }
}
