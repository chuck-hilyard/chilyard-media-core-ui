import datepicker from 'angular-ui-bootstrap/src/datepicker';
import decorator from './datepicker.decorator';

/**
 * @ngdoc module
 * @module common.rl-datepicker
 * @name common.rl-datepicker
 * @description adds decorator for bootstrap datepicker to add callback for month click
 */
export default angular
  .module('common.rl-datepicker', [
    datepicker
  ])
  .config(function($provide) {
    $provide.decorator('uibDatepickerDirective', decorator);
  })
  .name;
