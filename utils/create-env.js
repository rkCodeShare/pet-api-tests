/* eslint-disable no-undef */
const fs = require('fs');
const chalk = require('chalk');
const { exit } = require('process');

const environmentName = process.env.TEST_ENV;

switch (environmentName) {
  case 'dev':
    fs.copyFileSync('./.env.dev', './.env');
    console.log(chalk.yellow("Dev environment doesn't exist, it's a placeholder for now - try running <npm run test:prod>"));
    process.exit(1);
    break;
  case 'prod':
    fs.copyFileSync('./.env.prod', './.env');
    break;  
  default:
    fs.copyFileSync('./.env.dev', './.env');
    console.log(chalk.yellow("Dev environment doesn't exist, it's a placeholder for now - try running <npm run test:prod>"));
    process.exit(1);
    break;
}

