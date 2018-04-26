const steps = {
  STARTING_POSITION: 'STARTING_POSITION',
  INSTRUCTIONS: 'INSTRUCTIONS'
};

// associates the line number to the step it describes
const getStep = lineNumber => {
  if (lineNumber % 2 !== 0) return steps.INSTRUCTIONS;

  return steps.STARTING_POSITION;
};

module.exports = {
  steps,
  getStep
};
