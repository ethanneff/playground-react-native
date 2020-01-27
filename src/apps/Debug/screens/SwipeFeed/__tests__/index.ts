import dayjs from "dayjs";
import { formatRelativeDate } from "..";

describe("formatRelativeDate", () => {
  it("a few seconds ago", () => {
    const date = dayjs().add(10, "s");
    expect(formatRelativeDate(date)).toBe("");
  });
  it("a minute ago", () => {
    const date = dayjs().add(1, "m");
    expect(formatRelativeDate(date)).toBe("1m");
  });
  it("20 minutes ago", () => {
    const date = dayjs().add(20, "m");
    expect(formatRelativeDate(date)).toBe("20m");
  });
  it("an hour ago", () => {
    const date = dayjs().add(1, "hour");
    expect(formatRelativeDate(date)).toBe("1h");
  });
  it("3 hours ago", () => {
    const date = dayjs().add(3, "hour");
    expect(formatRelativeDate(date)).toBe("3h");
  });
  it("a day ago", () => {
    const date = dayjs().add(1, "day");
    expect(formatRelativeDate(date)).toBe("1d");
  });
  it("2 days ago", () => {
    const date = dayjs().add(3, "day");
    expect(formatRelativeDate(date)).toBe("3d");
  });
  it("a month ago", () => {
    const date = dayjs().add(1, "month");
    expect(formatRelativeDate(date)).toBe("4w");
  });
  it("3 months ago", () => {
    const date = dayjs().add(3, "month");
    expect(formatRelativeDate(date)).toBe("12w");
  });
  it("a year ago", () => {
    const date = dayjs().add(1, "year");
    expect(formatRelativeDate(date)).toBe("1y");
  });
  it("3 years ago", () => {
    const date = dayjs().add(3, "year");
    expect(formatRelativeDate(date)).toBe("3y");
  });
});
