module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          {type: 'fix', release: 'patch'},
          {type: 'refactor', release: 'patch'},
          {type: 'style', release: 'patch'},
          {type: 'docs', release: 'patch'},
          {type: 'chore', release: 'patch'},
          {type: 'test', release: 'patch'},
          {type: 'ci', release: 'patch'},
          {type: 'feat', release: 'minor'},
          {type: 'revert', release: 'minor'},
          {type: 'breaking', release: 'major'},
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['docs', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
  ],
};
