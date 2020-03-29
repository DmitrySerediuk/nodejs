/* eslint-disable */
// User predefined values

const ALLOW_ACTIONS = {
  ENCODE: 'encode',
  DECODE: 'decode'
};

const ERRORS = {
  NO_ACTION:
    'Error. Correct action parametrs not found. Allow encode/decode parametrs',
  NO_SHIFT: 'Error. Shift not found.',
  WRONG_SHIFT: 'Error. Shift should be a number.',
  INPUT_FILE_NOT_FOUND: 'Input file not found.',
  OUTPUT_FILE_NOT_FOUND: 'Output file not found.',
  PIPELINE_FILED: 'Pipeline filed.'
};

const ERROR_CODE = {
  OK: 0,
  RUN_TIME_ERROR: 7,
  INVALID_ARGUMENT: 9
};

const EXIT_CODE = 24; // CTRL+x;

module.exports = { ALLOW_ACTIONS, ERRORS, EXIT_CODE, ERROR_CODE };
