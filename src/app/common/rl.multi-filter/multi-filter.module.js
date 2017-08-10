import component from './multi-filter.component';
import filter from './multi-filter.filter';
import './multi-filter.scss';
import service from './filter-settings.service';


export default angular
  .module('common.multi-filter', [])
  .component('rlMultiFilter', component)
  .service('MultiFilterSettings', service)
  .filter('multifilter', filter)
  .name;
