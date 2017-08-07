/**
 * @ngdoc decorator
 * @module common.rl-exception
 * @name common.rl-exception
 * @description adds decorator for custom exception handler, uses logger
 */
const me = 'exceptionHandler';
export default ($delegate, $log, exceptionHandler) => {
  'ngInject';
  return (exception, cause) => {
    let appErrorPrefix = '[' + exceptionHandler.config.appErrorPrefix + '] ';
    let errorData = {
      exception: exception,
      cause: cause
    };
    $delegate(exception, cause);

    $log.error(appErrorPrefix + exception.message, errorData, me);
  };
};
