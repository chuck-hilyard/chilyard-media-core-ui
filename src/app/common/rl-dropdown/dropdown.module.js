import ngSanitize from 'angular-sanitize';
import uiSelect from 'ui-select';
import component from './dropdown.component';
import 'select2/select2.css';
import 'ui-select/dist/select.css';
import './dropdown.scss';

export default angular
  .module('common.dropdown', [ngSanitize, uiSelect])
  .component('rlDropdown', component)
  .name;
