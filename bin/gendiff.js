#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => {
    const fullPath1 = path.resolve(cwd(), filepath1);
    const fullPath2 = path.resolve(cwd(), filepath2);
    
    const file1 = readFileSync(fullPath1, 'utf-8');
    const file2 = readFileSync(fullPath2, 'utf-8');
    
    
    console.log(`Comparing files:
    ${filepath1}
    ${filepath2}
    Format: ${program.opts().format}`);
  });

program.parse(process.argv);

