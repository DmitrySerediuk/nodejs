/* eslint-disable */
// Module for work with user arguments and validation it.

const  fs = require('fs');
const { program } = require('commander');
const { ALLOW_ACTIONS, ERRORS,  ERROR_CODE} = require('./constants');

program
    .option('-s, --shift <step>', 'step for encoding/decoding')
    .option('-i, --input <filename>', 'input filename')
    .option('-o, --output <filename>', 'output filename')
    .option('-a, --action <type>', 'action type: encode/decode');

program.parse(process.argv);
let userArgs = program.opts();

if (userArgs.action !== ALLOW_ACTIONS.ENCODE &&
    userArgs.action !== ALLOW_ACTIONS.DECODE){
    console.error(ERRORS.NO_ACTION);
    process.exit(ERROR_CODE.INVALID_ARGUMENT);
}

if (!userArgs.shift) {
    console.error(ERRORS.NO_SHIFT);
    process.exit(ERROR_CODE.INVALID_ARGUMENT);
}

userArgs.shift = parseInt(userArgs.shift, 10);
if (!Number.isInteger(userArgs.shift)) {
    console.error(ERRORS.WRONG_SHIFT);
    process.exit(ERROR_CODE.INVALID_ARGUMENT);
}

if (userArgs.output && !fs.existsSync(userArgs.output)) {
    console.error(ERRORS.OUTPUT_FILE_NOT_FOUND);
    process.exit(ERROR_CODE.INVALID_ARGUMENT);
}

module.exports = { userArgs };
