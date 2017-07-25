/**
 * @ngdoc decorator
 * @module common.rl-datepicker
 * @name common.rl-datepicker
 * @description adds decorator for bootstrap datepicker to add callback for month click
 * @usage <div uib-datepicker... on-month-click="$ctrl.handleMonthClick(active)"></div>
 * This decorator adds the on-month-click callback to inform the caller when the user
 * selects a month from the month picker.  It passes the current active date as a parameter.
 * Caller can update the ng-model manually since bootstrap fails to do this.
 */
export default function($delegate) {
  'ngInject';
  let directive = $delegate[0],
    link = directive.link;

  angular.extend(directive.scope, {
    'onMonthClick': '&'
  });

  directive.compile = function() {
    return function(scope, element, attrs, ctrl) {
      link.apply(this, arguments);
      scope.$watch('datepickerMode', function(newValue, oldValue) {
        if (oldValue == 'month' && newValue == 'day') {
          scope.onMonthClick({
            'active': ctrl[0].activeDate
          });
        }
      });
    };
  };
  return $delegate;
}
