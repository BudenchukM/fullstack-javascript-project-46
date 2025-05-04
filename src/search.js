import _ from 'lodash';

function searchDiff(firstObject, secondObject) {
  const keys = _.union(Object.keys(firstObject), Object.keys(secondObject));
  const sortKeys = _.sortBy(keys);

  return sortKeys.map((key) => {
    const valueByKey1 = firstObject[key];
    const valueByKey2 = secondObject[key];

    if (!_.has(firstObject, key)) {
      return { name: key, value: valueByKey2, type: 'plus' };
    }
    if (!_.has(secondObject, key)) {
      return { name: key, value: valueByKey1, type: 'minus' };
    }
    if (_.isObject(valueByKey1) && _.isObject(valueByKey2)) {
      return { name: key, children: searchDiff(valueByKey1, valueByKey2), type: 'subtree' };
    }
    if (!_.isEqual(valueByKey1, valueByKey2)) {
      return {
        name: key, firstValue: valueByKey1, secondValue: valueByKey2, type: 'changed',
      };
    }

    return { name: key, value: valueByKey1, type: 'unchanged' };
  }, []);
}
export default searchDiff;
