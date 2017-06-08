// Campaign level mocks
import mockCampaignRequest from '../mock-data/campaign-request';
import mockSession from '../mock-data/session';

// Campaign Detail level mocks
import mockMetrics from './mock-data/metrics';
import mockTooltips from './mock-data/tooltips';


describe('components.campaign.detail', () => {

  let $ctrl, service;
  let mockSce = {
    trustAsHtml: (value) => value
  };

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('CampaignTrendChart', {});
      $provide.value('Session',mockSession);
      $provide.value('$sce', mockSce);
    });

    let bindings = {
      campaignRequest: mockCampaignRequest
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      service = $injector.get('CampaignDetailService');
      $ctrl = $componentController('campaign.detail', {}, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.gridData).toEqual({});
    expect($ctrl.sortState).toEqual({});
    expect($ctrl.tableDelegate).toEqual({});
    expect($ctrl.metrics).toEqual(mockMetrics);
    expect($ctrl.session).toEqual(mockSession);
    expect($ctrl.service).toEqual(service);
    expect($ctrl.tooltips).toEqual(mockTooltips);
  });

});
