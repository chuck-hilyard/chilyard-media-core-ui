/**
* This module is a very useful utility for multifilter search where text-search is involved with basic search comparator defined under filter-settings.js
* All available filters being handled with AND operator.
*/
export default angular
  .module('filters.multiFilter', [])
  .filter('multiFilter', () => {
    'ngInject';
    return (items, args) => {
      let settings = args[0];
      let key = args[1];
      return items.filter((item) => {
        // filter comparatorFunc(haystack, needle)
        // haystack is the item field to look into
        // needle is the search term to use from each filter
        // search term must not be empty
        // We are setting default column name as a searchKey to search upon while using multifilter text search feature
        let result = true;
        settings.filters.forEach((filter) => {
          let searchKey = key;
          if (angular.isDefined(filter.type) && filter.type != 'default' && filter.type !== '') {
            searchKey = filter.type;
          }
          result = result && (filter.searchTerm.length === 0 || filter.comparator.comparatorFunc(item[searchKey], filter.searchTerm));
        });
        return result;
      });
    };
  })
  .name;
