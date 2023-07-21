type GetRandomRange = {
  max: number;
  min: number;
};

const getRandomRange = ({ max, min }: GetRandomRange) =>
  Math.floor(Math.random() * (max - min) + min);

type GetNewLocation = {
  location: number;
  maxSpin: number;
  minSpin: number;
  numOfSegments: number;
};

export const getNewLocation = ({
  location,
  maxSpin,
  minSpin,
  numOfSegments,
}: GetNewLocation): number => {
  const spins = getRandomRange({ max: maxSpin, min: minSpin }) * 360;
  const winner = Math.floor(Math.random() * numOfSegments);
  const winnerSection = (winner * 360) / numOfSegments;
  return location + spins + winnerSection;
};

type GetWinnerIndex = {
  angleOfSegment: number;
  location: number;
  numOfSegments: number;
};

export const getWinnerIndex = ({
  angleOfSegment,
  location,
  numOfSegments,
}: GetWinnerIndex): number => {
  const deg = 360 - Math.floor(location % 360);
  const index = Math.floor(deg / angleOfSegment);
  return index >= numOfSegments ? 0 : index;
};
