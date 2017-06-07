import mocks from './detail.mocks';


describe('components.campaign.detail', () => {

  let $ctrl, $httpBackend, service;
  let mockSce = {
    trustAsHtml: (value) => value
  };

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('CampaignTrendChart', {});
      $provide.value('Session', mocks.session);
      $provide.value('$sce', mockSce);
    });

    let bindings = {
      campaignRequest: mocks.campaignRequest
    }

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $httpBackend = $injector.get('$httpBackend');
      service = $injector.get('CampaignDetailService');
      $ctrl = $componentController('campaign.detail', {}, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.gridData).toEqual({});
    expect($ctrl.sortState).toEqual({});
    expect($ctrl.tableDelegate).toEqual({});
    expect($ctrl.metrics).toEqual(mocks.metrics);
    expect($ctrl.session).toEqual(mocks.session);
    expect($ctrl.service).toEqual(service);
    expect($ctrl.tooltips).toEqual(mocks.tooltips);
  });

});
