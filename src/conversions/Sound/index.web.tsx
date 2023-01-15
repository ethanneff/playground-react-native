import { Howl } from 'howler';
import { type SuperAny } from '../../types/types';

export class Sound {
  static setCategory() {
    return null;
  }

  sound: Howl;

  constructor(asset: string, error: (soundId: number, e: Error) => void) {
    this.sound = new Howl({
      onloaderror: error as SuperAny,
      src: [asset],
    });
  }

  play = async (callback?: (sound: Sound) => void): Promise<void> => {
    if (this.sound.state() !== 'loaded') return;

    await this.sound.play();
    if (callback) callback(this);
  };

  stop = async (callback?: (sound: Sound) => void): Promise<void> => {
    await this.sound.stop();
    if (callback) callback(this);
  };
}
