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
        onSelect: angular.noop
      };
      $ctrl = $componentController('rlDropdown', {}, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.selected).toEqual(mocks.selected);
    expect($ctrl.disabled).toBeFalsy();
  });

  it('$onChanges', () => {
    let MockChange = new commonMocks.StubChanges()
      .addInitialChange('options', mocks.options)
      .build();
    $ctrl.$onChanges(MockChange);
    expect($ctrl.list).toEqual(mocks.options.list);
    expect($ctrl.placeholder).toBe(mocks.options.placeholder);
  });

});
