import component from './multi-filter.component';
import './multi-filter.scss';
import Service from './filter-settings.service';

export default angular
  .module('common.multi-filter', [])
  .component('rlMultiFilter', component)
  .service('MultiFilterSettingsService', Service)
  .name;
