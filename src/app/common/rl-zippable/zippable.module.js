import service from './zippable.service.js';

export default angular
  .module('common.zippable', [
    'common.rlConfig'
  ])
  .service('rlZippable', service)
  .name;
