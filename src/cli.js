import { Command } from 'commander';
import genDiff from './index.js';

const program = new Command();
function startGenDiff() {
  program
    .name('gendiff')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number', () => {
      console.log('1.0.0');
      process.exit(0);
    })
    .option('-f, --format [type]', 'output format', 'stylish')
    .option('-h, --help', ' Display help for command', () => {
      console.log(program.help());
      process.exit(0);
    })
    .action((filepath1, filepath2) => {
      const result = genDiff(filepath1, filepath2, program.opts().format);
      console.log(result);
    })
    .parse();
}
export default startGenDiff;
