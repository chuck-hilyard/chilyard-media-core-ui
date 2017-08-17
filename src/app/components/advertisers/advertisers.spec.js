describe('advertisers', () => {
  let $ctrl;

  let searchInputs = {
    advertiser: null,
    business: null,
    category: null,
    subCategory: null
  };

  beforeEach(() => {
    angular.mock.module('advertisers');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('advertisers');
    });
  });

  it('exists', () => {
    expect($ctrl).toBeDefined();
    expect($ctrl.filters).toEqual({});
    expect($ctrl.searchInputs).toEqual(searchInputs);
    expect($ctrl.hasFilters()).toBeFalsy();
  });

  describe('user enter search fields', () => {
    beforeEach(() => {
      $ctrl.setFilter('advertiser', 'foo');
      $ctrl.setFilter('category', {
        name: 'bar',
        id: 1
      });
    });

    it('set the filter and searchInputs object accordingly', () => {
      let newFilters = {
        advertiser: 'foo',
        category: {
          name: 'bar',
          id: 1
        }
      };
      let expectedSearchInputs = angular.extend({}, searchInputs, newFilters);
      expect($ctrl.filters).toEqual(newFilters);
      expect($ctrl.searchInputs).toEqual(expectedSearchInputs);
      expect($ctrl.hasFilters()).toBeTruthy();
    });

    describe('user clears search fields', () => {
      it('clear the filter and searchInputs objects', () => {
        $ctrl.clearFilters();
        expect($ctrl.filters).toEqual({});
        expect($ctrl.searchInputs).toEqual(searchInputs);
        expect($ctrl.hasFilters()).toBeFalsy();
      });
    });
  });

});
