import dayjs from 'dayjs';
import {formatRelativeDate} from '..';

describe('formatRelativeDate', () => {
  it('a few seconds ago', () => {
    const date = dayjs().subtract(10, 's');
    expect(formatRelativeDate(date)).toBe('');
  });
  it('30 seconds ago', () => {
    const date = dayjs().subtract(30, 's');
    expect(formatRelativeDate(date)).toBe('');
  });
  it('a minute ago', () => {
    const date = dayjs().subtract(1, 'm');
    expect(formatRelativeDate(date)).toBe('1m');
  });
  it('20 minutes ago', () => {
    const date = dayjs().subtract(20, 'm');
    expect(formatRelativeDate(date)).toBe('20m');
  });
  it('an hour ago', () => {
    const date = dayjs().subtract(1, 'hour');
    expect(formatRelativeDate(date)).toBe('1h');
  });
  it('3 hours ago', () => {
    const date = dayjs().subtract(3, 'hour');
    expect(formatRelativeDate(date)).toBe('3h');
  });
  it('a day ago', () => {
    const date = dayjs().subtract(1, 'day');
    expect(formatRelativeDate(date)).toBe('1d');
  });
  it('2 days ago', () => {
    const date = dayjs().subtract(3, 'day');
    expect(formatRelativeDate(date)).toBe('3d');
  });
  it('a month ago', () => {
    const date = dayjs().subtract(1, 'month');
    expect(formatRelativeDate(date)).toBe('4w');
  });
  it('3 months ago', () => {
    const date = dayjs().subtract(3, 'month');
    expect(formatRelativeDate(date)).toBe('13w');
  });
  it('a year ago', () => {
    const date = dayjs().subtract(1, 'year');
    expect(formatRelativeDate(date)).toBe('1y');
  });
  it('3 years ago', () => {
    const date = dayjs().subtract(3, 'year');
    expect(formatRelativeDate(date)).toBe('3y');
  });
});
