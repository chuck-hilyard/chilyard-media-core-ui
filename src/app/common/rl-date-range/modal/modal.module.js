import datepicker from 'angular-ui-bootstrap/src/datepicker';
import tabs from 'angular-ui-bootstrap/src/tabs';
import component from './modal.component';
import './modal.scss';

export default angular
  .module('common.date-range.modal', [
    datepicker,
    tabs
  ])
  .component('rlDateRangeModal', component)
  .name;
