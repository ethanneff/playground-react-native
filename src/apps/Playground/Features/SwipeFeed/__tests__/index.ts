import { describe, expect, it, jest } from '@jest/globals';
import { sub, toDate } from 'date-fns';
import { formatRelativeDate } from '../utils';

jest.useFakeTimers('modern').setSystemTime(new Date('2021-01-01T00:00:00Z'));

describe('formatRelativeDate', () => {
  it('a few seconds ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { seconds: 10 }));

    expect(formatRelativeDate(date)).toBe('');
  });

  it('30 seconds ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { seconds: 30 }));

    expect(formatRelativeDate(date)).toBe('');
  });

  it('a minute ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { minutes: 1 }));

    expect(formatRelativeDate(date)).toBe('1m');
  });

  it('20 minutes ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { minutes: 20 }));

    expect(formatRelativeDate(date)).toBe('20m');
  });

  it('an hour ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { hours: 1 }));

    expect(formatRelativeDate(date)).toBe('1h');
  });

  it('3 hours ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { hours: 3 }));

    expect(formatRelativeDate(date)).toBe('3h');
  });

  it('a day ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { days: 1 }));

    expect(formatRelativeDate(date)).toBe('1d');
  });

  it('2 days ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { days: 3 }));

    expect(formatRelativeDate(date)).toBe('3d');
  });

  it('a month ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { months: 1 }));

    expect(formatRelativeDate(date)).toBe('4w');
  });

  it('3 months ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { months: 3 }));

    expect(formatRelativeDate(date)).toBe('13w');
  });

  it('a year ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { years: 1 }));

    expect(formatRelativeDate(date)).toBe('1y');
  });

  it('3 years ago', () => {
    expect.hasAssertions();

    const date = toDate(sub(new Date(), { years: 3 }));

    expect(formatRelativeDate(date)).toBe('3y');
  });
});
