import yaml from 'js-yaml';

const parsers = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`File extension ${fileExtension} is not supported`);
  }
};
export default parsers;
