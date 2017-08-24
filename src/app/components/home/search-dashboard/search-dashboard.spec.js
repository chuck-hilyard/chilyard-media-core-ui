import commonMocks from '../../../../../test/mocks/common/common.mocks';

describe('components.home.search-dashboard', () => {

  let $q;
  let $ctrl;
  let drilldownService;
  let searchDashboardService;

  beforeEach(() => {
    angular.mock.module('searchDashboard', ($provide) => {
      $provide.value('rlApi', commonMocks.rlApi);
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('searchDashboard');
      $q = $injector.get('$q');

      drilldownService = $injector.get('DrillDownService');
      searchDashboardService = $injector.get('SearchDashboardService');
    });

    spyOn(searchDashboardService, 'getCampaignList').and.returnValue($q.when());
    spyOn(searchDashboardService, 'getCampaignDrilldown').and.returnValue($q.when());
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
    expect($ctrl.colorScheme).toEqual('scheme1');
    expect($ctrl.filteredData).toEqual([]);
    expect($ctrl.drilldownIconStatus).toEqual([]);
    expect($ctrl.drilldownViewItemList).toEqual([]);
    expect($ctrl.grayoutDashboard).toBeFalsy();
    expect($ctrl.DrillDownService).toEqual(drilldownService);
    expect($ctrl.SearchDashboardService).toEqual(searchDashboardService);
  });

  it('changes dashboard theme', () => {
    expect($ctrl.colorScheme).toEqual('scheme1');
    $ctrl.changeDashboardTheme('newScheme');
    expect($ctrl.colorScheme).toEqual('newScheme');
  });

  it('returns proper indicator', () => {
    expect($ctrl.getIndicator(1)).toEqual('red-indicator');
    expect($ctrl.getIndicator(2)).toEqual('yellow-indicator');
    expect($ctrl.getIndicator(3)).toEqual('green-indicator');
    expect($ctrl.getIndicator('different')).toEqual('grey-indicator');
  });

  it('returns proper flag indicator', () => {
    expect($ctrl.getFlagIndicator(true)).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator(1)).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator('string')).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator(undefined)).toEqual('green-indicator');
    expect($ctrl.getFlagIndicator(false)).toEqual('green-indicator');
    expect($ctrl.getFlagIndicator(0)).toEqual('green-indicator');
  });

  it('opens drilldown view', () => {
    let campaignObj = {campaignId: 1215};
    $ctrl.openDrillDownView(campaignObj);
    expect($ctrl.drilldownIconStatus[campaignObj.campaignId]).toEqual(1);
    expect($ctrl.grayoutDashboard).toBeTruthy();
  });

  it('closes drilldown view', () => {
    let campaignId = 1215;
    $ctrl.closeDrillDownView(campaignId);
    expect($ctrl.drilldownIconStatus[campaignId]).toEqual(0);
    expect($ctrl.grayoutDashboard).toBeFalsy();
  });

});
