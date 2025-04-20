#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const fullPath1 = path.resolve(process.cwd(), filepath1);
    const fullPath2 = path.resolve(process.cwd(), filepath2);
    const diff = genDiff(fullPath1, fullPath2, options.format);
    console.log(diff);
  });

program.parse(process.argv);
