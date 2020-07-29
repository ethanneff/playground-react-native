import path from 'path';

module.exports = {
  process: (_: string, filename: string) =>
    `module.exports = '${JSON.stringify(path.basename(filename))}';`,
};
