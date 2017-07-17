import mockdata from '../../../../../../test/mocks/components/campaign/performance/performance';
import mockChart from './mock-data/chart';
import metricsConfig from './configs/metrics';

describe('campaign.detail.trend-chart', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.colors');
    angular.mock.module('campaign.detail.trend-chart');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let locals = {};
      let bindings = {
        data: {},
        breakdownType: 'cycles'
      };
      $ctrl = $componentController('campaignTrendChart', locals, bindings);
    });
  });

  it('constructs', () => {
    let expectedMetrics = [
      metricsConfig.find((item) => item.id === 'impressions'),
      metricsConfig.find((item) => item.id === 'spend')
    ];
    expect($ctrl.chart).toEqual({});
    expect($ctrl.options).toEqual(metricsConfig);
    expect($ctrl.metrics).toEqual(expectedMetrics);
  });


  it('builds chart json object', () => {
    $ctrl.build(mockdata);
    expect($ctrl.chart.type).toBe('bar');
    expect($ctrl.chart.data.labels).toEqual(mockChart.labels);
    angular.forEach($ctrl.chart.data.datasets, (item, index) => {
      expect(item.data).toEqual(mockChart.datasets[index]);
    });
    let yAxes = $ctrl.chart.options.scales.yAxes;
    expect(yAxes[0].id).toBe('left');
    expect(yAxes[0].position).toBe('left');
    expect(yAxes[0].ticks.callback(1000)).toBe('1,000');
    expect(yAxes[1].id).toBe('right');
    expect(yAxes[1].position).toBe('right');
    expect(yAxes[1].ticks.callback(1000)).toBe('$1,000.00');
  });

  it('dropdowns filter out other selected metrics', () => {
    let filtered = $ctrl.filterOptions(1);
    let expected = metricsConfig;
    expected.splice(2, 1);
    expect(filtered).toEqual(expected);
  });

  it('updates chart', () => {
    spyOn($ctrl, 'build');
    $ctrl.updateChart();
    expect($ctrl.build).toHaveBeenCalledWith({});
  });

});
