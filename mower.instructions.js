const orientations = ['E', 'S', 'W', 'N'];

// returns the new orientation
const turn = (mower, direction) => {
  index = orientations.indexOf(mower.orientation);

  return direction === 'D'
    ? orientations[index + 1 > orientations.length - 1 ? 0 : index + 1]
    : orientations[index - 1 < 0 ? orientations.length - 1 : index - 1];
};

// returns the new position
const goForward = ({position, orientation}, [limitX, limitY]) => {
  if (orientation === 'E' && position.x < limitX) {
    return {x: position.x + 1, y: position.y};
  } else if (orientation === 'W' && position.x > 0) {
    return {x: position.x - 1, y: position.y};
  } else if (orientation === 'N' && position.y < limitY) {
    return {x: position.x, y: position.y + 1};
  } else if (orientation === 'S' && position.y > 0) {
    return {x: position.x, y: position.y - 1};
  }

  return position;
};

// mutates mower according to the instruction
const doInstruction = (mower, instruction, dimensions) => {
  switch (instruction) {
    case 'G':
    case 'D':
      mower.orientation = turn(mower, instruction);
      break;
    case 'A':
      mower.position = goForward(mower, dimensions);
      break;
  }
};

// applies each instruction and returns the mutatedMowerConfig (allows the usage of this function in .map())
const processMowerInstructions = dimensions => mowerConfig => {
  for (let instruction of mowerConfig.instructions) {
    doInstruction(mowerConfig, instruction, dimensions);
  }

  return mowerConfig;
};

module.exports = {
  turn,
  goForward,
  processMowerInstructions
};
