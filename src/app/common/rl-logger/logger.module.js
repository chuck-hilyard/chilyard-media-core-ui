import service from './logger.service.js';

export default angular
  .module('common.logger', [
    'common.rlConfig'
  ])
  .service('rlLogger', service)
  .name;
