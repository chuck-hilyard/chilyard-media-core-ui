describe('components.home.social-dashboard', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('socialDashboard');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('socialDashboard');
    });
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
  });

});
