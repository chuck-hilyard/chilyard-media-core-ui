export default angular
  .module('filters.sortNulls', [])
  /**
   * Sort null entries to the bottom (or top) of a collection
   * @param array     Row to be sorted
   * @param key       Key to be checked
   * @param reverse   [Optional] If true, put the empties at the top, instead of the bottom
   */
  .filter('sortNulls', () => {
    'ngInject';
    /**
     * Check the existance of the specified key for the input object
     * @param item  Object to examine
     * @param key   Key to check. Ex: 'foo.bar'
     */
    return (array, key, reverse) => {
      if (!angular.isDefined(reverse)) {
        reverse = false;
      }
      if (!key) return array;
      if (!angular.isArray(array)) return array;
      let present = array.filter((item) => {
        return keyExists(item, key);
      });
      let empty = array.filter((item) => {
        return !keyExists(item, key);
      });
      if (reverse) {
        return empty.concat(present);
      }
      else {
        return present.concat(empty);
      }
    };
  })
  .name;
let keyExists = (item, key) => {
  let keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    try {
      item = item[k];
    }
    catch (error) {
      return false;
    }
  }
  return angular.isDefined(item);
};
