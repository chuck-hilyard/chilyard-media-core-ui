import bootstrapModal from 'angular-ui-bootstrap/src/modal';
import component from './date-range.component';
import dateRangeModal from './modal/modal.module';
import service from './service/service.module';
import './date-range.scss';


export default angular
  .module('common.date-range', [
    bootstrapModal,
    dateRangeModal,
    service
  ])
  .component('rlDateRange', component)
  .name;
