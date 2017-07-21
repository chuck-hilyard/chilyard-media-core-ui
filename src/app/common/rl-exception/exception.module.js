import provider from './exception.provider.js';
import decorator from './exception.decorator.js';

/**
 * @ngdoc module
 * @module common.rl-exception
 * @name common.rl-exception
 * @description uses logger to log exceptions
 */
export default angular
  .module('common.rl-exception', [])
  .provider('exceptionHandler', provider)
  .config(($provide) => {
    $provide.decorator('$exceptionHandler', decorator);
  })
  .name;
