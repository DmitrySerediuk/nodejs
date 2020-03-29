/* eslint-disable */
const os = require('os');
const { Transform } = require('stream');

const { EXIT_CODE, ALLOW_ACTIONS, ERROR_CODE } = require('./constants');

class CeasarCrypt extends Transform {
  constructor(act, shift, quiteInput, quiteOutput) {
    super();
    this.shift = shift;
    this.act = act;
    this.quiteOutput = quiteOutput;
    this.quiteInput = quiteInput;
    this.eol = !this.quiteInput ? '' : os.EOL;
    if (!this.quiteInput) {
      console.log(
        `Write new text for ${this.act} and push ENTER for process. For exit push write CTRL+x and ENTER${os.EOL}`
      );
    }
  }

  crypt(msg, shift) {
    let cryptMsg = '';
    for (let i = 0; i < msg.length; i++) {
      const plainCharacter = msg.charCodeAt(i);
      if (plainCharacter >= 97 && plainCharacter <= 122) {
        cryptMsg += String.fromCharCode(
          ((plainCharacter - 97 + shift) % 26) + 97
        );
      } else if (plainCharacter >= 65 && plainCharacter <= 90) {
        cryptMsg += String.fromCharCode(
          ((plainCharacter - 65 + shift) % 26) + 65
        );
      } else {
        cryptMsg += String.fromCharCode(plainCharacter);
      }
    }
    return cryptMsg;
  }

  decrypt(msg, shift) {
    let decryptMsg = '';
    for (let i = 0; i < msg.length; i++) {
      const plainCharacter = msg.charCodeAt(i);
      if (plainCharacter >= 97 && plainCharacter <= 122) {
        decryptMsg += String.fromCharCode(
          ((plainCharacter - 97 - shift + 26) % 26) + 97
        );
      } else if (plainCharacter >= 65 && plainCharacter <= 90) {
        decryptMsg += String.fromCharCode(
          ((plainCharacter - 65 - shift + 26) % 26) + 65
        );
      } else {
        decryptMsg += String.fromCharCode(plainCharacter);
      }
    }
    return decryptMsg;
  }

  _transform(chunk, enc, done) {
    if (chunk.toString().charCodeAt(0) === EXIT_CODE) {
      process.exit(ERROR_CODE.OK);
    }

    const outputMsg =
      this.act === ALLOW_ACTIONS.ENCODE
        ? this.crypt(chunk.toString(), this.shift)
        : this.decrypt(chunk.toString(), this.shift);

    if (this.quiteOutput) {
      if (this.quiteInput) {
        this.push(outputMsg + os.EOL);
      } else {
        this.push(outputMsg);
      }
    } else {
      let msg = `Input message for ${this.act}: ${chunk.toString()}${this.eol}`;
      msg += `Output ${this.act}d message: ${outputMsg}${this.eol}---------------------------------------${os.EOL}${os.EOL}`;
      this.push(msg);
      if (!this.quiteInput) {
        console.log(
          `Write new text for ${this.act} and push ENTER for process. For exit push CTRL+x and ENTER${os.EOL}`
        );
      }
    }
    done();
  }
}

module.exports = { CeasarCrypt };
