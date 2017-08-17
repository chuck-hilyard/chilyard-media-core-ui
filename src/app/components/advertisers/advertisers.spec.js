describe('advertisers', () => {
  let $ctrl;

  beforeEach(() => {
    angular.mock.module('advertisers');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('advertisers');
    });
  });

  it('exists', () => {
    expect($ctrl).toBeDefined();
    expect($ctrl.subCategories.disabled).toBeTruthy();
  });

  describe('user filters by category', () => {
    it('enables the sub-category filter select', () => {
      $ctrl.handleCategorySelect({name: 'foo', id: 1});
      expect($ctrl.subCategories.disabled).toBeFalsy();
    });
  });

});
