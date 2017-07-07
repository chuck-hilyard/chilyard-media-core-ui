import bootstrapModal from 'angular-ui-bootstrap/src/modal';
import component from './date-range.component';
import dateRangeModal from './modal/modal.module';
import service from './service/service.module';
import dateRangeLabel from './range-label/range-label.module';
import './date-range.scss';


export default angular
  .module('common.date-range', [
    bootstrapModal,
    dateRangeModal,
    service,
    dateRangeLabel
  ])
  .component('rlDateRange', component)
  .name;
