import { Howl, type HowlErrorCallback } from 'howler';

export class Sound {
  static setCategory() {
    return null;
  }

  sound: Howl;

  constructor(asset: string, error: (soundId: number, e: Error) => void) {
    this.sound = new Howl({
      onloaderror: error as HowlErrorCallback | undefined,
      src: [asset],
    });
  }

  play = async (callback?: (sound: Sound) => void): Promise<void> => {
    if (this.sound.state() !== 'loaded') return;
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await this.sound.play();
    if (callback) callback(this);
  };

  stop = async (callback?: (sound: Sound) => void): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await this.sound.stop();
    if (callback) callback(this);
  };
}
