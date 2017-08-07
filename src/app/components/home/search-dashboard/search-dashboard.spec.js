describe('components.home.search-dashboard', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('searchDashboard');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('searchDashboard');
    });
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
  });
});
