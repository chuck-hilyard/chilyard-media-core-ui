// Campaign level mocks
import mockCampaignOverview from '../../../../../test/mocks/components/campaign/overview/overview';
import mockCampaignCycles from '../../../../../test/mocks/components/campaign/cycles/cycles';
import mockRlConfig from '../mock-data/rlConfig.json';

describe('components.campaign.detail', () => {

  let $ctrl, service, dataSettings;

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('rlConfig', mockRlConfig);
    });

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: mockCampaignOverview
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let stateParams = {
        mcid: 123456
      };
      service = $injector.get('CampaignDetailService');
      dataSettings = $injector.get('DataSettingsService');

      $ctrl = $componentController('campaign.detail', {
        $stateParams: stateParams
      }, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.ageGenderData).toBeNull();
    expect($ctrl.performanceData).toBeNull();
    expect($ctrl.service).toEqual(service);
  });

  it('$onChanges', () => {
    let breakdown = 'cycles';
    let params = {start: '2017/3', end: '2017/5'};
    spyOn(service, 'getPerformanceData').and.callThrough();
    spyOn(dataSettings, 'getSelectedBreakdownType').and.callFake(() => breakdown);
    spyOn(dataSettings, 'getSelectedRangeParams').and.callFake(() => params);
    $ctrl.$onChanges({
      campaignOverview: {
        currentValue: mockCampaignOverview
      }
    });
    expect($ctrl.campaign).toEqual(mockCampaignOverview);
    expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, breakdown, params);
  });

});
