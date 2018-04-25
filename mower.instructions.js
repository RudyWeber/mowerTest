const orientations = ['E', 'S', 'W', 'N'];

const turn = (mower, direction) => {
  index = orientations.indexOf(mower.orientation);

  direction === 'D'
    ? (mower.orientation =
        orientations[index + 1 > orientations.length - 1 ? 0 : index + 1])
    : (mower.orientation =
        orientations[index - 1 < 0 ? orientations.length - 1 : index - 1]);
};

const goForward = (mower, [limitX, limitY]) => {
  if (mower.orientation === 'E' && mower.position.x < limitX) {
    mower.position.x += 1;
  } else if (mower.orientation === 'W' && mower.position.x > 0) {
    mower.position.x -= 1;
  } else if (mower.orientation === 'N' && mower.position.y < limitY) {
    mower.position.y += 1;
  } else if (mower.orientation === 'S' && mower.position.y > 0) {
    mower.position.y -= 1;
  }
};

module.exports = {
  turn,
  goForward
};
