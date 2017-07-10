describe('common.navbar', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.rlConfig');
    angular.mock.module('common.navbar');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('rlNavbar');
    });
  });

  it('constructs', () => {
    expect($ctrl.collapsed).toBeTruthy();
  });

  it('toggle navbar collapse', () => {
    $ctrl.toggle();
    expect($ctrl.collapsed).toBeFalsy();
    $ctrl.toggle();
    expect($ctrl.collapsed).toBeTruthy();
  });

});
