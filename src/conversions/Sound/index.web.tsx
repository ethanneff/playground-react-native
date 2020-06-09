import {Howl} from 'howler';

type Callback = (sound: Sound) => void;

export class Sound {
  static setCategory() {}
  sound: Howl;

  constructor(asset: string, error: (soundId: number, error: Error) => void) {
    this.sound = new Howl({
      src: [asset],
      onloaderror: error as any,
    });
  }

  play = async (callback?: Callback) => {
    if (this.sound.state() !== 'loaded') {
      return;
    }
    await this.sound.play();
    if (callback) {
      callback(this);
    }
  };

  stop = async (callback?: Callback) => {
    await this.sound.stop();
    if (callback) {
      callback(this);
    }
  };
}
