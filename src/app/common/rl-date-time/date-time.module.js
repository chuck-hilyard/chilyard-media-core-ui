import service from './date-time.service.js';

export default angular
  .module('common.date-time', [])
  .service('rlDateTime', service)
  .name;
