import commonMocks from '../../../../../test/mocks/common/common.mocks';

describe('components.home.search-dashboard', () => {

  let $q;
  let $ctrl;
  let $filter;
  let drilldownService;
  let searchDashboardService;
  let multiFilterSettingsService;

  beforeEach(() => {
    angular.mock.module('searchDashboard', ($provide) => {
      $provide.service('MultiFilterSettingsService', function() {
        this.build = angular.noop;
        this.parseAdditional = angular.noop;
      });

      $provide.value('rlApi', commonMocks.rlApi);
      $provide.value('rlLogger', commonMocks.rlLogger);
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('searchDashboard');
      $q = $injector.get('$q');
      $filter = $injector.get('$filter');

      drilldownService = $injector.get('DrillDownService');
      searchDashboardService = $injector.get('SearchDashboardService');
      multiFilterSettingsService = $injector.get('MultiFilterSettingsService');
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
    expect($ctrl.filterService).toEqual(multiFilterSettingsService);
    expect($ctrl.$filter).toEqual($filter);
    expect($ctrl.$q).toEqual($q);
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

  it('sets dropdowns', () => {
    expect($ctrl.platform_values).toBeUndefined();
    expect($ctrl.cp_values).toBeUndefined();
    expect($ctrl.dmc_values).toBeUndefined();

    $ctrl.setInitialValues();

    expect($ctrl.platform_values).toEqual({
      options: {
        showFields: [{field: 'platformName'}],
        list: [],
        placeholder: 'USA',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    });

    expect($ctrl.cp_values).toEqual({
      options: {
        showFields: [{field: 'CP'}],
        list: [],
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    });

    expect($ctrl.dmc_values).toEqual({
      options: {
        showFields: [{field: 'businessName'}],
        list: [],
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    });
  });

  it('updates settings', () => {
    expect($ctrl.filterSettings).toBeUndefined();
    $ctrl.updateSettings({testSettings: 'testSettings'});
    expect($ctrl.filterSettings).toEqual({testSettings: 'testSettings'});
  });

});
