describe('components.home.search-dashboard.drilldown-service', () => {

  let $service, $filter;

  beforeEach(() => {
    angular.mock.module('home.dashboard-drilldown.service');
    angular.mock.inject((DrillDownService) => {
      $service = DrillDownService;
    });
    angular.mock.inject(($injector) => {
      $filter = $injector.get('$filter');
    });
  });


  it('constructs', () => {
    expect($service).toBeDefined();
    expect($service.$filter).toEqual($filter);
    expect($service.drilldownViewItemList).toEqual([]);
  });

});
