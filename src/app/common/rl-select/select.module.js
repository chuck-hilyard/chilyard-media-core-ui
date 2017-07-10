import component from './select.component';
import selectFilter from './select.filter';
import './select.scss';

export default angular
  .module('common.select', [])
  .component('rlSelect', component)
  .filter('selectFilter', () => selectFilter)
  .name;
