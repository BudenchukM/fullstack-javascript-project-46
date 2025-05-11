import fs from 'fs';
import path from 'path';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();
  
  switch (extension) {
    case '.json':
      return JSON.parse(content);
    
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = getFileContent(filepath1);
  const data2 = getFileContent(filepath2);
  
  
  console.log('File 1:', data1);
  console.log('File 2:', data2);
  
  return `Comparing ${filepath1} and ${filepath2} with ${format} format`;
}
