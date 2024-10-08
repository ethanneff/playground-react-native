import { describe, expect, it } from '@jest/globals';
import { colorWithOpacity } from '..';

describe('colorWithOpacity', () => {
  const exampleColor = 'hsl(17, 99%, 59%)';

  it('returns when passed an opacity', () => {
    expect.hasAssertions();
    expect(colorWithOpacity(exampleColor, 0.2)).toBe('hsla(17, 99%, 59%, 0.2)');
  });

  it('returns when passed no opacity', () => {
    expect.hasAssertions();
    expect(colorWithOpacity(exampleColor)).toBe('hsla(17, 99%, 59%, 0.5)');
  });

  it('returns when passed an opacity greater than 1', () => {
    expect.hasAssertions();
    expect(colorWithOpacity(exampleColor, 2)).toBe('hsla(17, 99%, 59%, 1)');
  });

  it('returns when passed an opacity less than 0', () => {
    expect.hasAssertions();
    expect(colorWithOpacity(exampleColor, -2)).toBe('hsla(17, 99%, 59%, 0)');
  });

  it('returns when passed an invalid hsl color', () => {
    expect.hasAssertions();
    expect(colorWithOpacity('#ffffff', -2)).toBe('#ffffff');
  });
});
