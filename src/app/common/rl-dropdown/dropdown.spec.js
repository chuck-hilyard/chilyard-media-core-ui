import mocks from './dropdown.mocks';
import mockLogger from '../../../../test/mocks/common/mock-logger';

describe('common.dropdown', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.dropdown', ($provide) => {
      $provide.value('rlLogger', mockLogger);
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let bindings = {
        options: mocks.options,
        onSelect: angular.noop
      };
      $ctrl = $componentController('rlDropdown', {}, bindings);
    });
  });

  it('constructs', () => {
    $ctrl.$onChanges({
      options: {
        currentValue: mocks.options
      }
    });
    expect($ctrl.selected).toEqual(mocks.options.selected);
  });

});
