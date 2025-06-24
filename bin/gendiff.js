#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import genDiff from '../src/index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish, plain)', 'stylish')
  .action((filepath1, filepath2, options) => {
  try {
    console.log(genDiff(filepath1, filepath2, options.format));
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nUsage example:');
    console.log('  gendiff __fixtures__/file1.json __fixtures__/file2.json');
    process.exit(1);
  }
  })
  .helpOption('-h, --help', 'display help for command');

program.parse();
