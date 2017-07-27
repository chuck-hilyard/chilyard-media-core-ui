import datepicker from 'angular-ui-bootstrap/src/datepicker';
import component from './modal.component';
import './modal.scss';

export default angular
  .module('common.date-range.modal', [
    datepicker
  ])
  .component('rlDateRangeModal', component)
  .name;
