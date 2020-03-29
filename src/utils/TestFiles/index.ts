import path from 'path';

module.exports = {
  process: (_: any, filename: string) =>
    `module.exports = '${JSON.stringify(path.basename(filename))}';`,
};
