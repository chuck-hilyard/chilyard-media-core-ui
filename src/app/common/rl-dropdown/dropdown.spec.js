import mocks from './dropdown.mocks';
import commonMocks from '../../../../test/mocks/common/common.mocks.js';

describe('common.dropdown', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.dropdown', ($provide) => {
      $provide.value('rlLogger', commonMocks.logger);
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let bindings = {
        selected: mocks.selected,
        options: mocks.options,
        onSelect: angular.noop
      };
      $ctrl = $componentController('rlDropdown', {}, bindings);
    });
  });

  it('$onInit', () => {
    $ctrl.$onInit();
    expect($ctrl.selected).toEqual(mocks.selected);
    expect($ctrl.list).toEqual(mocks.options.list);
    expect($ctrl.placeholder).toBe(mocks.options.placeholder);
    expect($ctrl.disabled).toBeFalsy();
  });

});
