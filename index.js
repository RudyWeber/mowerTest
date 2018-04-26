const argv = process.argv.slice(2);

if (argv.length > 1) process.exit(-1);

const readline = require('readline');

const {
  steps: {STARTING_POSITION},
  getStep
} = require('./steps.js');
const {
  turn,
  goForward,
  processMowerInstructions
} = require('./mower.instructions.js');
const {createMowerConfig, displayMower} = require('./mower.utils.js');

const solve = config => {
  const [dimensionsLine, ...stepLines] = config.split('\n');
  const dimensions = dimensionsLine.split(' ');

  // no need to keep the last line (empty)
  stepLines.splice(-1);

  const mowerConfigs = stepLines.reduce((configs, currentStep, stepIndex) => {
    if (getStep(stepIndex) === STARTING_POSITION)
      configs.push(createMowerConfig(currentStep));
    else configs[configs.length - 1].instructions = currentStep;

    return configs;
  }, []);

  mowerConfigs.map(processMowerInstructions(dimensions)).forEach(displayMower);
};

const getStream = () => {
  if (argv.length === 1) {
    const fs = require('fs');

    if (!fs.existsSync(argv[0])) {
      console.log(`Cannot open ${argv[0]}: file not found`);
      process.exit(-1);
    }

    return fs.createReadStream(argv[0]);
  }

  return process.stdin;
};

const readInput = () =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: getStream()
    });

    let input = '';

    rl
      .on('line', line => {
        input += line + '\n';
      })
      .on('close', () => resolve(input));
  });

readInput().then(solve);
