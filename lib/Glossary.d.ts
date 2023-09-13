interface SAF {
    scope: Scope;
    scopes: Scopes[];
    versions: Version[];
}
interface Scope {
    website: string;
    scopetag: string;
    scopedir: string;
    curatedir: string;
    glossarydir: string;
    defaultvsn: string;
    mrgfile: string;
}
interface Scopes {
    scopetags: string[];
    scopedir: string;
}
interface Version {
    vsntag: string;
    mrgfile: string;
    altvsntags: string[];
}
interface MRG {
    terminology: Terminology;
    scopes: Scopes[];
    entries: Entry[];
}
interface Terminology {
    scopetag: string;
    scopedir: string;
    curatedir: string;
    vsntag: string;
    altvsntags: string[];
}
export interface Entry {
    term: string;
    altterms?: string[];
    vsntag: string;
    scopetag: string;
    locator: string;
    formPhrases?: string;
    glossaryText: string;
    navurl?: string;
    headingids?: string[];
    altvsntags?: string[];
    [key: string]: any;
}
export interface Output {
    entries: Entry[];
}
export declare class Glossary {
    scopedir: string;
    saf: SAF;
    runtime: Output;
    constructor({ scopedir, input }: {
        scopedir: string;
        input: string | null;
    });
    /**
     * Initializes the glossary by populating the runtime glossary.
     * @returns A promise that resolves to the populated runtime glossary.
     */
    initialize(mrgFileName: string | null): Promise<Output>;
    /**
     * Retrieves the SAF (Scope Administration File) map.
     * @returns A promise that resolves to the SAF map.
     */
    private getSafMap;
    /**
     * Retrieves the MRG (Machine Readable Glossary) map.
     * @returns A promise that resolves to the MRG map.
     */
    getMrgMap(mrgURL: string): Promise<MRG>;
    /**
     * Populates the runtime glossary by processing MRG entries.
     * @param mrg - The MRG (Machine Readable Glossary) map.
     * @param filename - The filename of the MRG being processed.
     * @returns A promise that resolves to the populated runtime glossary.
     */
    populateRuntime(mrg: MRG, filename: string): Promise<Output>;
}
export {};
