// Campaign level mocks
import mockCampaignOverview from '../../../../../test/mocks/components/campaign/overview/overview';
import mockDataSettings from '../mock-data/mock-data-settings';
import mockRlConfig from '../mock-data/rlConfig.json';

describe('components.campaign.detail', () => {
  let $ctrl, service;

  let mockChange = {
    campaignOverview: {
      currentValue: mockCampaignOverview
    },
    currentDataSettings: {
      currentValue: mockDataSettings
    }
  };

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('rlConfig', mockRlConfig);
    });

    let bindings = {
      campaignOverview: mockCampaignOverview,
      currentDataSettings: mockDataSettings
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      service = $injector.get('CampaignDetailService');
      $ctrl = $componentController('campaign.detail', {}, bindings);
    });

    spyOn(service, 'getPerformanceData').and.callThrough();
    spyOn(service, 'getAgeGenderData').and.callThrough();
    spyOn(service, 'getDeviceData').and.callThrough();
  });

  it('constructs', () => {
    expect($ctrl.ageGenderData).toBeNull();
    expect($ctrl.deviceData).toBeNull();
    expect($ctrl.performanceData).toBeNull();
    expect($ctrl.service).toEqual(service);
  });

  describe('$onChanges', () => {
    describe('given changes object', () => {
      it('when overview and data settings change, then it should load performance, device and age/gender data', () => {
        $ctrl.$onChanges(mockChange);
        expect($ctrl.campaign).toEqual(mockCampaignOverview);
        expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
        expect(service.getAgeGenderData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
        expect(service.getDeviceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
      });
      it('when neither overview and data settings have changed, then it should not load performance, device or age/gender data', () => {
        $ctrl.$onChanges({somethingElse: {currentValue: 5}});
        expect(service.getPerformanceData).not.toHaveBeenCalled();
        expect(service.getAgeGenderData).not.toHaveBeenCalled();
        expect(service.getDeviceData).not.toHaveBeenCalled();
      });
    });

    describe('loading indicators', () => {
      it('shows while waiting for promise', () => {
        let loadingLoop = (boolean) => {
          angular.forEach($ctrl.loading, (item) => {
            expect(item).toBe(boolean);
          });
        };
        loadingLoop(false);
        $ctrl.$onChanges(mockChange);
        $ctrl.getData();
        loadingLoop(true);
        expect(service.getPerformanceData).toHaveBeenCalled();
        expect(service.getAgeGenderData).toHaveBeenCalled();
        expect(service.getDeviceData).toHaveBeenCalled();
      });
    });
  });

});
