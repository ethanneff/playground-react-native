type GetRandomRange = {
  min: number;
  max: number;
};

const getRandomRange = ({ min, max }: GetRandomRange) => {
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
}: GetNewLocation): number => {
  const spins = getRandomRange({ min: minSpin, max: maxSpin }) * 360;
  const winner = Math.floor(Math.random() * numOfSegments);
  const winnerSection = (winner * 360) / numOfSegments;
  return location + spins + winnerSection;
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
}: GetWinnerIndex): number => {
  const deg = 360 - Math.floor(location % 360);
  const index = Math.floor(deg / angleOfSegment);
  return index >= numOfSegments ? 0 : index;
};
