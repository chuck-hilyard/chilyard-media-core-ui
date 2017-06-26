//import mockCampaignSidebar from './mock-data/campaign-sidebar';
import mockCampaignRequest from './mock-data/campaign-request';
import mockCampaignOverview from './mock-data/campaign-overview';

describe('components.campaign', () => {

  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign', ($provide) => {
      //$provide.value('CampaignSidebar', mockCampaignSidebar);
    });

    let bindings = {
      campaignRequest: mockCampaignRequest,
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
    // If we are testing the entire module then campaignSidebar is part of the
    // module so we probably don't want to mock it...
    //expect($ctrl.sidebar).toEqual(mockCampaignSidebar);
    expect($ctrl.sidebar).toBeDefined();
    expect($ctrl.sidebar.links).toBeDefined();
  });

  it('$onInit', () => {
    $ctrl.$onInit();
    expect($ctrl.advertiser).toEqual(mockCampaignRequest.data.advertiser);
    expect($ctrl.campaign).toEqual(mockCampaignRequest.data.campaign);
    expect($ctrl.order).toEqual(mockCampaignRequest.data.order);
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
