// Campaign level mocks
import mockCampaignOverview from '../../../../../test/mocks/components/campaign/overview/overview';
import mockCampaignCycles from '../../../../../test/mocks/components/campaign/cycles/cycles';
import mockRlConfig from '../mock-data/rlConfig.json';

describe('components.campaign.detail', () => {

  let $ctrl, $scope, service;

  let dataService = {
    selectedSettings: {
      breakdownType: 'cycles'
    },
    getSelectedBreakdownType: angular.noop,
    getSelectedRangeParams: angular.noop
  };

  let mockChange = {
    campaignOverview: {
      currentValue: mockCampaignOverview
    }
  };

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('DataSettingsService', dataService);
      $provide.value('rlConfig', mockRlConfig);
    });

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: mockCampaignOverview
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $scope = $injector.get('$rootScope').$new();
      service = $injector.get('CampaignDetailService');
      $ctrl = $componentController('campaign.detail', {
        $scope: $scope
      }, bindings);
    });
    spyOn(service, 'getPerformanceData').and.callThrough();
    spyOn(service, 'getAgeGenderData').and.callThrough();
    spyOn(service, 'getDeviceData').and.callThrough();
  });

  it('constructs', () => {
    expect($ctrl.ageGenderData).toBeNull();
    expect($ctrl.deviceData).toBeNull();
    expect($ctrl.performanceData).toBeNull();
    expect($ctrl.dataSettingsService).toEqual(dataService);
    expect($ctrl.service).toEqual(service);
  });

  it('$onChanges', () => {
    let breakdown = 'cycles';
    let params = {start: 1, end: 9};
    spyOn(dataService, 'getSelectedBreakdownType').and.callFake(() => breakdown);
    spyOn(dataService, 'getSelectedRangeParams').and.callFake(() => params);
    $ctrl.$onChanges(mockChange);
    expect($ctrl.campaign).toEqual(mockCampaignOverview);
    expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
    expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
    expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
  });

  it('$watch', () => {
    let breakdown = 'days';
    let params = {start: '2017-03-01', end: '2017-05-01'};
    spyOn(dataService, 'getSelectedBreakdownType').and.callFake(() => breakdown);
    spyOn(dataService, 'getSelectedRangeParams').and.callFake(() => params);
    $ctrl.campaign = mockCampaignOverview;
    dataService.selectedSettings.breakdownType = 'days';
    $scope.$digest();
    expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
    expect(service.getAgeGenderData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
    expect(service.getDeviceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
  });

});
