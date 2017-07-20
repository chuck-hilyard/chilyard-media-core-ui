describe('common.datepicker', () => {

  var compile, scope, directiveElem;

  beforeEach(() => {
    angular.mock.module('common.rl-datepicker');

    angular.mock.inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
      scope.mockModel = new Date();
      scope.handleMonthClick = jasmine.createSpy('handleMonthClick');
    });

    directiveElem = getCompiledElement();
  });

  describe('given a bootstrap datepicker directive', () => {
    it('when directive exist, then it will add onMonthClick callback', () => {
      var isolatedScope = directiveElem.isolateScope();
      expect(typeof(isolatedScope.onMonthClick)).toEqual('function');
    });

    it('when mode changes from month to day, then it will call the onMonthClick callback', () => {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.datepickerMode = 'month';
      scope.$apply();
      isolatedScope.datepickerMode = 'day';
      scope.$apply();
      expect(scope.handleMonthClick).toHaveBeenCalledTimes(1);
    });

    it('when mode changes from day to month, then it will not call the onMonthClick callback', () => {
      var isolatedScope = directiveElem.isolateScope();
      isolatedScope.datepickerMode = 'day';
      scope.$apply();
      isolatedScope.datepickerMode = 'month';
      scope.$apply();
      expect(scope.handleMonthClick).not.toHaveBeenCalledTimes(1);
    });
  });

  function getCompiledElement() {
    var element = angular.element('<div uib-datepicker ng-model="mockModel" on-month-click="handleMonthClick(active)"></div>');

    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
