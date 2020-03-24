const { program } = require('commander');
 
class ceasarCli{
    ALLOW_ACTIONS = {
        "ENCODE" : "encode",
        "DECODE" : "decode",
    };

    ERRORS = {
        'NO_ACTION' : "Error. Action parametrs not found.",
        'NO_SHIFT' : "Error. Shift not found.",
        'WRONG_SHIFT' : "Error. Shift should be a number.",
    }

    constructor(userArgs) {
        this.userArgs = this.prepareArgs();
    }

    prepareArgs(){
        program
            .option('-s, --shift <step>', 'step for encoding/decoding')
            .option('-i, --input <filename>', 'input filename')
            .option('-o, --output <filename>', 'output filename')
            .option('-a, --action <type>', 'action type: encode/decode');
 
        program.parse(process.argv);
        return program.opts();   
    }

    isArgsAreCorrect(userArgs){
        if (userArgs.action != this.ALLOW_ACTIONS.ENCODE && userArgs.action != this.ALLOW_ACTIONS.DECODE){
            throw this.ERRORS.NO_ACTION;
        }

        if (userArgs.shift == undefined){
            throw this.ERRORS.NO_SHIFT;
        }

        if (!Number.isInteger(userArgs.shift)){
            throw this.ERRORS.WRONG_SHIFT;
        }

        return true;
    }

    main(){
        this.isArgsAreCorrect(this.userArgs);

    }
}

let ceasar = new ceasarCli(false);
ceasar.main();
// console.log(ceasar.test1);

// program
//   .option('-s, --shift <step>', 'step for encoding/decoding')
//   .option('-i, --input <filename>', 'input filename')
//   .option('-o, --output <filename>', 'output filename')
//   .option('-a, --action <type>', 'action type: encode/decode');
 
// program.parse(process.argv);
 
// console.log(program.opts());
// console.log(program.output);
// console.log(`- ${program.opts().action}`);