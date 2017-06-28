import mockCampaignOverview from './mock-data/campaign-overview';
import mockCampaignCycles from '../../../../test/mocks/components/campaign/cycles/cycles';

describe('components.campaign', () => {

  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign', ($provide) => {
      //$provide.value('CampaignSidebar', mockCampaignSidebar);
    });

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: mockCampaignOverview
    }

    angular.mock.inject(($injector) => {
      let stateParams = {
        mcid: 123456
      }
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
    expect($ctrl.campaign).toEqual(mockCampaignOverview.data);
    expect($ctrl.header.title).toEqual(mockCampaignOverview.data.name);
    expect($ctrl.header.subTitle).toEqual(mockCampaignOverview.data.advertiserName);
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
