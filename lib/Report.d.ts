import { Logger } from 'tslog';
interface Output<T> {
    items: T[];
}
declare class Report {
    termErrors: Output<{
        file: string;
        line: number;
        message: string;
    }>;
    converted: Output<{
        content: string;
    }>;
    fallback: Output<{
        content: string;
    }>;
    files: Output<{
        content: string;
    }>;
    errors: Set<unknown>;
    termHelp(file: string, line: number, message: string): void;
    mrgHelp(file: string, line: number, message: string): void;
    termConverted(term: any): void;
    fileWritten(file: string): void;
    print(): void;
    private formatMessage;
}
export declare const report: Report;
export declare const log: Logger<unknown>;
export {};
