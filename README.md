# Machine Readable Glossary Tool (MRGT)

## Overview

The **Machine Readable Glossary Tool (MRGT)** generates a Machine Readable Glossary (MRG) for each of the versions of the terminology that are maintained with that scope by reading the SAF. There is more information about here:
- [overview of the TEv2 tools](https://tno-terminology-design.github.io/tev2-specifications/docs/tev2-overview) of which the TRRT is a part.

## Installation

Install from the command line and make globally available.

```bash
npm install @aviarytech/mrgt -g
```

## Calling the Tool

The behavior of the MRGT can be configured per call e.g. by a configuration file and/or command-line parameters. The command-line syntax is as follows:

```bash
mrgt [ <paramlist> ]
```

The MRGT takes in the following parameters:

| Flags                    | Description                                                                       | Required |
|--------------------------|-----------------------------------------------------------------------------------|:--------:|
| -c, --config \<path>    | Path (including the filename) of the tool's (YAML) configuration file             | No       |
| -s, --scopedir \<path>  | Path of the scope directory where the SAF is located                              | Yes      |
| -v, --vsntag \<vsntag>  | Version tag for which the MRG will be generated. When omitted, an MRG will be generated for every version of the terminology that is specified in the versions section of the SAF | No       |
| -e, --onNotExist \<action>   | Specifies the action to take if a vsntag was specified but wasn't found in the SAF. Default is 'throw'. Options: 'throw', 'warn', 'log', 'ignore'                         | No       |


