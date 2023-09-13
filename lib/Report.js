import { Logger } from 'tslog';
class Report {
    termErrors = {
        items: []
    };
    converted = {
        items: []
    };
    fallback = {
        items: []
    };
    files = {
        items: []
    };
    errors = new Set();
    termHelp(file, line, message) {
        this.termErrors.items.push({ file, line, message });
    }
    mrgHelp(file, line, message) {
        this.errors.add(this.formatMessage('MRG HELP', file, line, message));
    }
    termConverted(term) {
        if (term.fallback) {
            this.fallback.items.push({ content: term });
        }
        else {
            this.converted.items.push({ content: term });
        }
    }
    fileWritten(file) {
        this.files.items.push({ content: file });
    }
    print() {
        console.log("\x1b[1;37m");
        console.log(" Resolution Report:");
        console.log("       \x1b[0mNumber of files modified: " + this.files.items.length);
        console.log("       \x1b[0mNumber of terms converted: " + this.converted.items.length);
        if (this.fallback.items.length > 0) {
            console.log("       \x1b[0mNumber of terms with fallback: " + this.fallback.items.length);
        }
        if (this.termErrors.items.length > 0) {
            console.log("   \x1b[1;37mTerm Errors:\x1b[0m");
            const uniqueTermHelpMessages = new Map();
            for (const item of this.termErrors.items) {
                const key = item.message;
                if (uniqueTermHelpMessages.has(key)) {
                    uniqueTermHelpMessages.get(key).push(item);
                }
                else {
                    uniqueTermHelpMessages.set(key, [item]);
                }
            }
            for (const [key, value] of uniqueTermHelpMessages) {
                console.log(`\x1b[1;31m${'TERM HELP'.padEnd(12)} \x1b[0m${key}:`);
                const filesMap = new Map();
                for (const item of value) {
                    if (!filesMap.has(item.file)) {
                        filesMap.set(item.file, []);
                    }
                    filesMap.get(item.file).push(item.line);
                }
                for (const [file, lines] of filesMap) {
                    const lineNumbers = lines.join(':');
                    console.log(`   \x1b[1;37m${file}:${lineNumbers}`);
                }
            }
        }
        if (this.errors.size > 0) {
            console.log("\n   \x1b[1;37mMain Errors:\x1b[0m");
            for (const err of this.errors) {
                console.log(err);
            }
        }
    }
    formatMessage(type, file, line, message) {
        let locator = `${file}`;
        if (line > -1) {
            locator += `:${line}`;
        }
        if (locator.length > 50) {
            locator = `...${locator.slice(-(50 - 5))}`;
        }
        locator = locator.padEnd(50);
        const formattedMessage = `\x1b[1;31m${type.padEnd(12)} \x1b[1;37m${locator} \x1b[0m${message}`;
        return formattedMessage;
    }
}
export const report = new Report();
export const log = new Logger();
