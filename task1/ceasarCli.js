/* eslint-disable */
const process = require('process');
const fs = require('fs');
const { pipeline } = require('stream');

const { userArgs } = require('./arguments');
const { CeasarCrypt } = require('./ceasarCrypt');
const { ERROR_CODE, ERRORS } = require('./constants');


class CeasarCli {
  constructor() {
    this.userArgs = userArgs;
    this.quiteInput = true;
    this.quiteOutput = true;
    this.inputChannel = undefined;
    this.outputChannel = undefined;
  }

  prepareInput() {
    if (this.userArgs.input === undefined){
      this.quiteInput = false;
      this.inputChannel = process.stdin;
    }else{
      this.inputChannel = new fs.ReadStream(this.userArgs.input);
      this.inputChannel.on('error', (err) => {
        console.error(err);
        process.exit(ERROR_CODE.RUN_TIME_ERROR);
      });
    }
  }

  prepareOutput() {
    if (this.userArgs.output === undefined){
      this.quiteOutput = false;
      this.outputChannel = process.stdout;
    }else{
      this.outputChannel = new fs.WriteStream(this.userArgs.output, {'flags': 'a'});
      this.outputChannel.on('error', function(err) {
        console.error(err);
        process.exit(ERROR_CODE.RUN_TIME_ERROR);
      });
    }
  }


  syncPipe() {
    pipeline (
      this.inputChannel,
      new CeasarCrypt(
        this.userArgs.action,
        this.userArgs.shift, 
        this.quiteInput,
        this.quiteOutput
      ),
      this.outputChannel,
      (err) => { 
        if (err){
          console.error(ERRORS.PIPELINE_FILED + err);
          process.exit(ERROR_CODE.RUN_TIME_ERROR);
        } 
      }
    );
  }

  main() {
    this.prepareInput();
    this.prepareOutput();
    this.syncPipe();
  }
}

module.exports = { CeasarCli };