import mockCampaignOverview from './mock-data/campaign-overview';
import mockCampaignCycles from '../../../../test/mocks/components/campaign/cycles/cycles';

describe('components.campaign', () => {
  let mockCampaignSettings = { breakdownType: 'cycles', start: 1, end: 10 };

  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign', () => {});

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: mockCampaignOverview,
      campaignSettings: mockCampaignSettings
    };

    angular.mock.inject(($injector) => {
      let stateParams = {
        mcid: 123456
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
    expect($ctrl.campaign).toEqual(mockCampaignOverview);
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
