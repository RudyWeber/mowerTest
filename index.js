const argv = process.argv.slice(2);

if (argv.length > 1) process.exit(-1);

const fs = require('fs');
const readline = require('readline');

const {steps, getStep} = require('./steps.js');
const {turn, goForward} = require('./mower.instructions.js');

let dimensions = null;
let currentMower = null;
let stepIndex = 0;

const setFieldDimensions = line => {
  dimensions = line.split(' ');
};

const setCurrentMower = line => {
  const [x, y, orientation] = line.split(' ');

  currentMower = {
    orientation,
    position: {x: Number(x), y: Number(y)}
  };
};

const processInstruction = (mower, instruction) => {
  switch (instruction) {
    case 'G':
    case 'D':
      turn(mower, instruction);
      break;
    case 'A':
      goForward(mower, dimensions);
      break;
  }
};

const processMowerInstructions = instructions => {
  for (let instruction of instructions) {
    processInstruction(currentMower, instruction);
  }

  console.log(
    [
      currentMower.position.x,
      currentMower.position.y,
      currentMower.orientation
    ].join(' ')
  );
};

const stepToFunc = {
  [steps.INIT_FIELD]: setFieldDimensions,
  [steps.STARTING_POSITION]: setCurrentMower,
  [steps.INSTRUCTIONS]: processMowerInstructions
};

const stream = argv.length === 1 ? fs.createReadStream(argv[0]) : process.stdin;

const rl = readline.createInterface({
  input: stream
});

rl.on('line', line => line && stepToFunc[getStep(stepIndex++)](line));
