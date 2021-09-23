import { Sound } from '../../conversions';

type Sounds = 'tap';

const soundBank = {
  tap: new Sound(require('./tap.mp3')),
};

let active: Sounds | null = null;

type SoundManagerType = {
  play: (soundName: Sounds) => void;
  stop: () => void;
};

const playSound = (soundName: Sounds) => {
  active = soundName;
  soundBank[active].play(() => {
    active = null;
  });
};

const stopSound = (callback?: () => void) => {
  if (active == null) return;

  soundBank[active].play(() => {
    active = null;
    if (callback) callback();
  });
};

export const SoundManager: SoundManagerType = {
  play: soundName => {
    if (active === null) {
      playSound(soundName);
      return;
    }
    stopSound(() => playSound(soundName));
  },
  stop: () => stopSound,
};
