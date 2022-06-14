import { Howl } from 'howler';
import { SuperAny } from '../../types/types';

type Callback = (sound: Sound) => void;

export class Sound {
  static setCategory(): void {
    return;
  }
  sound: Howl;

  constructor(asset: string, error: (soundId: number, e: Error) => void) {
    this.sound = new Howl({
      src: [asset],
      onloaderror: error as SuperAny,
    });
  }

  play = async (callback?: Callback): Promise<void> => {
    if (this.sound.state() !== 'loaded') return;

    await this.sound.play();
    if (callback) callback(this);
  };

  stop = async (callback?: Callback): Promise<void> => {
    await this.sound.stop();
    if (callback) callback(this);
  };
}
