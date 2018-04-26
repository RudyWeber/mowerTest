const displayMower = mower => {
  console.log(
    [mower.position.x, mower.position.y, mower.orientation].join(' ')
  );
};

const createMowerConfig = line => {
  const [x, y, orientation] = line.split(' ');

  return {
    orientation,
    position: {
      x: Number(x),
      y: Number(y)
    }
  };
};

module.exports = {
  createMowerConfig,
  displayMower
};
