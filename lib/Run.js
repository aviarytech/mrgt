#!/usr/bin/env node
import { Generator } from "./Generator.js";
import { Command } from "commander";
import { readFileSync } from "fs";
import { resolve } from "path";
import { report, log } from "./Report.js";
import yaml from "js-yaml";
import chalk from "chalk";
import figlet from "figlet";
export let generator;
export let glossary;
const program = new Command();
program
    .name("mrgt")
    .version("0.0.1")
    .usage("[ <paramlist> ]\n" +
    "- <paramlist> (optional) is a list of key-value pairs")
    .description("The CLI for the Machine Readable Glossary Tool (MRGT)")
    .option("-c, --config <path>", "Path (including the filename) of the tool's (YAML) configuration file")
    .option("-s, --scopedir <path>", "Path of the scope directory where the SAF is located")
    .option("-v, --vsntag <vsntag>", "Version tag for which the MRG will be generated. When omitted, an MRG will be generated for every version of the terminology that is specified in the versions section of the SAF")
    .option("-e, --onNotExist <action>", "Specifies the action to take if a vsntag was specified but wasn't found in the SAF. Default is 'throw'. Options: 'throw', 'warn', 'log', 'ignore'")
    .parse(process.argv);
program.parse();
async function main() {
    // Parse command line parameters
    var options = program.opts();
    if (program.args[0]) {
        options.input = program.args[0];
    }
    console.log(chalk.red(figlet.textSync("hrgt-cli", { horizontalLayout: "full" })));
    if (options.config) {
        try {
            const config = yaml.load(readFileSync(resolve(options.config), "utf8"));
            // Merge config options with command line options
            options = { ...config, ...options };
        }
        catch (err) {
            log.error(`E011 Failed to read or parse the config file '${options.config}':`, err);
            process.exit(1);
        }
    }
    // Create a Generator with the provided options
    generator = new Generator({
        method: options.method ?? "html",
        scopedir: options.scopedir ?? ".",
        input: options.input,
        output: options.output ?? "default",
    });
    // Resolve terms
    try {
        await generator.generate();
        log.info("Generation complete...");
        report.print();
        process.exit(0);
    }
    catch (err) {
        log.error("E012 Something unexpected went wrong while generating HRG:", err);
        process.exit(1);
    }
}
main();
