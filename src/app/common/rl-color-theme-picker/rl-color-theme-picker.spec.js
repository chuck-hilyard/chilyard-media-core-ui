describe('common.rl-color-theme-picker', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.color-theme-picker');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('rlColorThemePicker');
    });
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
    expect($ctrl.isSettingsBoxOpened).toBe(false);
  });
});
