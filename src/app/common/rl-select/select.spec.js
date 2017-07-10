import mocks from './select.mocks';

describe('common.select', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.select');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let bindings = {
        options: mocks.options,
        onSelect: angular.noop
      };
      $ctrl = $componentController('rlSelect', {}, bindings);
    });
  });

  it('constructs', () => {
    $ctrl.$onInit();
    expect($ctrl.selected).toEqual(mocks.options.selected);
  });

});
