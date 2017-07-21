import service from './logger.service.js';

export default angular
  .module('common.logger', [])
  .service('rlLogger', service)
  .name;
