import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

test('flat JSON files comparison', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFixture('expected.txt');
  expect(genDiff(file1, file2)).toBe(expected);
});

describe('genDiff', () => {
  const expected = readFixture('expected.txt');

  test('compares flat JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2)).toBe(expected);
  });

  test('compares flat YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    expect(genDiff(file1, file2)).toBe(expected);
  });

  test('compares mixed JSON and YAML files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.yml');
    expect(genDiff(file1, file2)).toBe(expected);
  });
});
