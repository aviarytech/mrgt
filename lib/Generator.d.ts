export declare class Generator {
    private method;
    private scopedir;
    private inputGlob;
    private outputName;
    private glossary;
    private entries;
    private htmlOutput;
    constructor({ method, scopedir, input, output, }: {
        method: any;
        scopedir: string;
        input: string;
        output: string;
    });
    generate(): Promise<string>;
    private createGlossary;
    private processGlossaryData;
    private generateHTML;
    private writeToFile;
}
