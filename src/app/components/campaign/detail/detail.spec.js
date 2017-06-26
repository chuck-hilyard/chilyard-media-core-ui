// Campaign level mocks
import mockCampaignRequest from '../mock-data/campaign-request';
import mockSession from '../mock-data/session';
import mockRlConfig from '../mock-data/rlConfig.json';

// Campaign Detail level mocks
import mockMetrics from './mock-data/metrics';
import mockTooltips from './mock-data/tooltips';


describe('components.campaign.detail', () => {

  let $ctrl, $sce, service, rlConfig;

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('CampaignTrendChart', {});
      $provide.value('Session',mockSession);
      $provide.value('rlConfig', mockRlConfig);
    });

    let bindings = {
      campaignRequest: mockCampaignRequest
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let stateParams = {
        mcid: 123456
      }
      $sce = $injector.get('$sce');
      rlConfig = $injector.get('rlConfig');
      service = $injector.get('CampaignDetailService');
      $ctrl = $componentController('campaign.detail', {$stateParams: stateParams}, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.gridData).toEqual({});
    expect($ctrl.metrics).toEqual(mockMetrics);
    expect($ctrl.session).toEqual(mockSession);
    expect($ctrl.service).toEqual(service);
    expect($ctrl.sortState).toEqual({});
    expect($ctrl.tableDelegate).toEqual({});
    expect($ctrl.trendChart).toEqual({});
    angular.forEach($ctrl.tooltips, (value, key) => {
      expect($sce.getTrustedHtml(value)).toBe(mockTooltips[key]);
    });
  });

  it('$onInit', () => {
    spyOn(service, 'getTrendData').and.callThrough();
    spyOn(service, 'getPerformanceData').and.callThrough();
    $ctrl.$onInit();
    expect($ctrl.campaign).toEqual(mockCampaignRequest.data.campaign);
    // getTrendData call commented out in demo code
    //expect(service.getTrendData).toHaveBeenCalledWith(123456, {dates:'2017-01-01,2017-01-31',metrics:'impressions,spend'});
    expect(service.getPerformanceData).toHaveBeenCalledWith(123456, {dates:'2017-01-01,2017-01-31'});

  });

  describe('dateRangeToString', () => {
    it('converts date range object to a string', () => {
      let dateString = $ctrl.dateRangeToString();
      expect(dateString).toBe('2017-01-01,2017-01-31');
    });
  });

  describe('metricFilter', () => {
    it('returns unselected metrics', () => {
      let metrics = $ctrl.metricFilter('trend', 1);
      let filterString = JSON.stringify($ctrl.metrics.trend[1]);
      let expected = angular.copy(mockMetrics.options).filter((value) => {
        return JSON.stringify(value) !== filterString;
      });
      expect(metrics).toEqual(expected);
    });
  });

});
