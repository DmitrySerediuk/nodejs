# RS School REST Task 1: Ceasar CLI application

## Autor contact:
 - Discord:    DmitrySerediuk(@k0smm0s) 
 - Telegram:   @DmitrySerediuk

 ## Short insturction:
- git clone https://github.com/DmitrySerediuk/nodejs
- cd {path_to_dirname} ex. cd c:\\nodejs
- npm install 
- npm run my_caesar_cli -- -a encode -s 7 -i "./task1/files/input.txt" -o "C:\rss\nodejs\task1\files\out.txt" 
- npm run my_caesar_cli -- --action encode -s 7 -i "./task1/files/input.txt"
- npm run my_caesar_cli -- -a encode -s 7 -i -o "C:\rss\nodejs\task1\files\out.txt" 
- npm run my_caesar_cli -- -a encode -s 7
- npm run my_caesar_cli -- -a decode --shift 7

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/DmitrySerediuk/nodejs
```

## Prepare terminal
After download need go to downloaded dir in console

```
cd {pat_to_dirname} ex. cd c:\\nodejs
```

## Installing NPM modules

```
npm install 
```

## Running application

```
npm run my_caesar_cli -- -a encode -s 7 -i "./task1/files/input.txt" -o "C:\rss\nodejs\task1\files\out.txt" 
OR
node {path_to_scriptname} -a encode -s 7 -i "./files/input.txt" -o "./files/out.txt"
ex.
node task1/index -a encode -s 7 -i "./task1/files/input.txt" -o "C:\rss\nodejs\task1\files\out.txt"
```

## Arguments:
-a (-- action) Allow type "encode" or "decode". Required option. Crypt or Decrypt message
ex.
```
npm run my_caesar_cli -- -a encode -s 7 -i "./files/input.txt" -o "./files/out.txt"
npm run my_caesar_cli -- -a decode -s 7 -i "./files/input.txt" -o "./files/out.txt" 
```

-s (--shift) Shift for crypt/decrypt message. Required option. Should be a number. If it mix with number and sting, where number first - shift will be first number: ex -s 123ab will work like -s 123. -s ab314 or -s dafdf will get error.
ex.
```
npm run my_caesar_cli -- -a encode -s 7 -i "./files/input.txt" -o "./files/out.txt"
```

-i (--input) Input file name for encode/decode. If it empty - need write text by console with user frendly interface. If -i given, but file not found or not readable - throw error.
                - You can use short path or full path for input file(be attention with backslashes):
                ex.
```
                    npm run my_caesar_cli -- -a encode -s 7 -i "./files/input.txt" -o "./files/out.txt"
                    npm run my_caesar_cli -- -a encode -s 7 -i "C:\rss\nodejs\task1\files\input.txt" -o "./files/out.txt"
```
- If -i is hide, text write by termial. For crypt/decrypt need write text and push ENTER. For exit: push CTRL+с and ENTER
```
                   npm run my_caesar_cli -- -a encode -s 7 -o "./files/out.txt"
```

-o (--output) Output file name for encode/decode. If it empty - output text write to console with user frendly interface. If -o given, but file not found or not writable - throw error.
                - You can use short path or full path for output file(be attention with backslashes):
                ex.
```
                    npm run my_caesar_cli -- -a encode -s 7 -i "./files/input.txt" -o "./files/out.txt"
                    npm run my_caesar_cli -- -a encode -s 7 -i "./files/input.txt" -o "C:\rss\nodejs\task1\files\out.txt"
```

- If -i is hide, output text write to termial.  For exit: push CTRL+с and ENTER
```
                    npm run my_caesar_cli -- -a encode -s 7
```

## Code stucture:
    README.md                   : readme file with help
    - /task1                    : Dir with application files
        - index.js              : Main run file
        - constants.js          : It contain messages and user frendly errors and exit button code for exit from console in stdin mode
        - arguments.js          : Module getting user arguments and validate it
        - ceasarCrypt.js        : Transform stream class for crypt or decrypt message
        - ceasarCli.js          : Class for work with pipeline. Prepare input an output and pipe it.
        - /files                : Dir for input/output user files
            - /files/input.txt  : Input file with text for encode/decode
            - /files/out.txt    : Output file for encoded/decodeв text 
    