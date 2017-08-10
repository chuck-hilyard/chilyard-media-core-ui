/**
* This module is a very useful utility for multifilter search where text-search is involved with basic search comparator defined under filter-settings.js
* All available filters being handled with AND operator.
*/
export default function() {
  return function (items, settings, key) {
    return items.filter(function (item) {
      return settings.filters.reduce((memo, filter) => {
        // filter comparatorFunc(haystack, needle)
        // haystack is the item field to look into
        // needle is the search term to use from each filter
        // search term must not be empty
        // We are setting default column name as a searchKey to search upon while using multifilter text search feature
        let searchKey = key;
        // It will change searchKey based upon the type property set into additionalFilters that should be the key exists into the entity objects
        if (angular.isDefined(filter.type) && filter.type != 'default' && filter.type !== '') {
          searchKey = filter.type;
        }

        return memo && (filter.searchTerm.length === 0 || filter.comparator.comparatorFunc(item.entity[searchKey], filter.searchTerm));
      });
    });
  };
}
