
import searchFilter from './search-filter.filter';

export default angular
  .module('common.search-filter', [])
  .filter('rlSearchFilter', () => searchFilter)
  .name;
