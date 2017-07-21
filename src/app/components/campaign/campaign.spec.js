import mockCampaignOverview from './mock-data/campaign-overview';
import mockCampaignCycles from '../../../../test/mocks/components/campaign/cycles/cycles';
import mockLogger from '../../../../test/mocks/common/mock-logger';

describe('components.campaign', () => {
  let mockDateTime = {
    newDate: angular.noop
  };
  let mockDataSettings = {
    initialize: angular.noop
  };
  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign', ($provide) => {
      $provide.value('DataSettings', mockDataSettings);
      $provide.value('rlLogger', mockLogger);
      $provide.value('rlDateTime', mockDateTime);
    });

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: mockCampaignOverview,
    };

    angular.mock.inject(($injector) => {
      let stateParams = {
        mcid: 1842601
      };
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('campaign', {
        $stateParams: stateParams
      }, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.sidebar).toBeDefined();
    expect($ctrl.sidebar.links).toBeDefined();
  });

  it('$onInit', () => {
    $ctrl.$onInit();
    expect($ctrl.campaignOverview).toEqual(mockCampaignOverview);
    expect($ctrl.header.title).toEqual(mockCampaignOverview.name);
    expect($ctrl.header.subTitle).toEqual(mockCampaignOverview.advertiserName);
  });

  describe('handleSidebarToggle', () => {
    it('collapses sidebar', () => {
      $ctrl.handleSidebarToggle(true);
      expect($ctrl.sidebar.collapsed).toBeTruthy();
    });
    it('expands sidebar', () => {
      $ctrl.handleSidebarToggle(false);
      expect($ctrl.sidebar.collapsed).toBeFalsy();
    });
  });

});
