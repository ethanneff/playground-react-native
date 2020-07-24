type GetRandomRange = {
  min: number;
  max: number;
};

const getRandomRange = ({min, max}: GetRandomRange) => {
  return Math.floor(Math.random() * (max - min) + min);
};

type GetNewLocation = {
  minSpin: number;
  maxSpin: number;
  numOfSegments: number;
  location: number;
};

export const getNewLocation = ({
  minSpin,
  maxSpin,
  numOfSegments,
  location,
}: GetNewLocation) => {
  const spins = getRandomRange({min: minSpin, max: maxSpin}) * 360;
  const winner = Math.floor(Math.random() * numOfSegments);
  const winnerSection = Math.floor(winner * (360 / numOfSegments));
  const newLocation = location + spins + winnerSection;
  return newLocation;
};

type GetWinnerIndex = {
  location: number;
  numOfSegments: number;
  angleOfSegment: number;
};

export const getWinnerIndex = ({
  location,
  numOfSegments,
  angleOfSegment,
}: GetWinnerIndex) => {
  const deg = Math.abs(Math.round(location % 360));
  const index =
    (numOfSegments - Math.floor(deg / angleOfSegment)) % numOfSegments;
  return index;
};
