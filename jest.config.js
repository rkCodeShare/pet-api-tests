module.exports = {
  testMatch: ['**/?(*)+(spec|test).[jt]s?(x)'],
  verbose: true,
  maxWorkers : 3,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'html-report.html',
        expand: true,
      },
    ],   
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
