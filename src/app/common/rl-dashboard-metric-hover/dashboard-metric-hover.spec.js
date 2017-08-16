describe('common.dashboard-metric-hover', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.dashboard-metric-hover');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('dashboardMetricHover');
    });
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
    expect($ctrl.metricItemList).toEqual([]);
    expect($ctrl.metricPopupClass).toEqual('up-arrow-left');
    expect($ctrl.service).toBeDefined();
  });

});

describe('dashboard-metric-hover-service', () => {

  let $service;

  beforeEach(() => {
    angular.mock.module('common.dashboard-metric-hover');
    angular.mock.inject((DashboardMetricHoverService) => {
      $service = DashboardMetricHoverService;
    });
  });

  it('constructs', () => {
    expect($service).toBeDefined();
  });

});
