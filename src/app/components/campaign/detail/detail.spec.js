// Campaign level mocks
import mockCampaignOverview from '../../../../../test/mocks/components/campaign/overview/overview';
import mockCampaignCycles from '../../../../../test/mocks/components/campaign/cycles/cycles';
import mockSession from '../mock-data/session';
import mockRlConfig from '../mock-data/rlConfig.json';

describe('components.campaign.detail', () => {

  let $ctrl, service;

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('CampaignTrendChart', {});
      $provide.value('Session', mockSession);
      $provide.value('rlConfig', mockRlConfig);
    });

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: {
        data: mockCampaignOverview
      }
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let stateParams = {
        mcid: 123456
      };
      service = $injector.get('CampaignDetailService');
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
    spyOn(service, 'getPerformanceData').and.callThrough();
    $ctrl.$onChanges({
      campaignOverview: {
        currentValue: {
          data: mockCampaignOverview
        }
      }
    });
    expect($ctrl.campaign).toEqual(mockCampaignOverview);
    //expect(service.getPerformanceData).toHaveBeenCalledWith(mockCampaignOverview.masterCampaignId, 'cycles', {
    //  start: 1,
    //  end: 10
    //  });
  });

});
