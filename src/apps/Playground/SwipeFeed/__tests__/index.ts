import dayjs from 'dayjs';
import {formatRelativeDate} from '../utils';

describe('formatRelativeDate', () => {
  it('a few seconds ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(10, 's');
    expect(formatRelativeDate(date)).toBe('');
  });
  it('30 seconds ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(30, 's');
    expect(formatRelativeDate(date)).toBe('');
  });
  it('a minute ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(1, 'm');
    expect(formatRelativeDate(date)).toBe('1m');
  });
  it('20 minutes ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(20, 'm');
    expect(formatRelativeDate(date)).toBe('20m');
  });
  it('an hour ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(1, 'hour');
    expect(formatRelativeDate(date)).toBe('1h');
  });
  it('3 hours ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(3, 'hour');
    expect(formatRelativeDate(date)).toBe('3h');
  });
  it('a day ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(1, 'day');
    expect(formatRelativeDate(date)).toBe('1d');
  });
  it('2 days ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(3, 'day');
    expect(formatRelativeDate(date)).toBe('3d');
  });
  it('a month ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(1, 'month');
    expect(formatRelativeDate(date)).toBe('4w');
  });
  it('3 months ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(3, 'month');
    expect(formatRelativeDate(date)).toBe('13w');
  });
  it('a year ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(1, 'year');
    expect(formatRelativeDate(date)).toBe('1y');
  });
  it('3 years ago', () => {
    expect.hasAssertions();
    const date = dayjs().subtract(3, 'year');
    expect(formatRelativeDate(date)).toBe('3y');
  });
});
