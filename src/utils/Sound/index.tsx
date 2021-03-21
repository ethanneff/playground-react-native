import {Sound} from '../../conversions';

const soundBank = {
  tap: new Sound(require('./tap.mp3')),
};

type Sound = keyof typeof soundBank;

let active: Sound | null = null;

type SoundManagerType = {
  play: (soundName: Sound) => void;
  stop: () => void;
};

const playSound = (soundName: Sound) => {
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
