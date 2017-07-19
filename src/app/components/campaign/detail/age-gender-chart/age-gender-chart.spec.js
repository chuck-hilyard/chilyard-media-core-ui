import mockdata from '../../../../../../test/mocks/components/campaign/age-gender/age-gender';
import mockChart from './mock-data/chart';
import metricsConfig from './configs/metrics';

describe('campaign.detail.age-gender-chart', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.colors');
    angular.mock.module('campaign.detail.age-gender-chart');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let locals = {};
      let bindings = {
        data: {},
      };
      $ctrl = $componentController('campaignAgeGenderChart', locals, bindings);
    });
  });

  it('constructs', () => {
    let expectedMetrics = [
      metricsConfig.find((item) => item.id === 'impressions'),
      metricsConfig.find((item) => item.id === 'pageEngagements')
    ];
    expect($ctrl.charts).toEqual([]);
    expect($ctrl.metricOptions).toEqual(metricsConfig);
    expect($ctrl.metrics).toEqual(expectedMetrics);
  });

  it('builds charts array of json objects', () => {
    $ctrl.build(mockdata);

    // Chart 1 data should have negative values to spoof right to left alignment
    expect($ctrl.charts[0].data.datasets[0].label).toBe(mockChart[0].datasets[0].label);
    expect($ctrl.charts[0].data.datasets[0].data).toEqual(mockChart[0].datasets[0].data);
    expect($ctrl.charts[0].data.datasets[1].label).toBe(mockChart[0].datasets[1].label);
    expect($ctrl.charts[0].data.datasets[1].data).toEqual(mockChart[0].datasets[1].data);
    expect($ctrl.charts[0].options.scales.xAxes[0].ticks.suggestedMin).toBe(-1);
    expect($ctrl.charts[0].options.scales.xAxes[0].ticks.callback(-1000)).toBe('1,000');

    expect($ctrl.charts[1].data.datasets[0].label).toBe(mockChart[1].datasets[0].label);
    expect($ctrl.charts[1].data.datasets[0].data).toEqual(mockChart[1].datasets[0].data);
    expect($ctrl.charts[1].data.datasets[1].label).toBe(mockChart[1].datasets[1].label);
    expect($ctrl.charts[1].data.datasets[1].data).toEqual(mockChart[1].datasets[1].data);
    expect($ctrl.charts[1].options.scales.xAxes[0].ticks.suggestedMin).toBe(1);
    expect($ctrl.charts[1].options.scales.xAxes[0].ticks.callback(1000)).toBe('1,000');
  });

  it('dropdowns filter out other selected metrics', () => {
    let filtered = $ctrl.filterOptions(1);
    let expected = metricsConfig;
    expected.splice(6, 1);
    expect(filtered).toEqual(expected);
  });

  describe('change chart metric', () => {
    it('updates chart', () => {
      spyOn($ctrl, 'build');
      $ctrl.updateChart();
      expect($ctrl.build).toHaveBeenCalledWith({});
    });
  });

  describe('data is error', () => {
    it('shows error message', () => {
      spyOn($ctrl, 'build');
      $ctrl.$onChanges({
        data: {
          currentValue: new Error('this is an error')
        }
      });
      expect($ctrl.build).not.toHaveBeenCalled();
    });
  });

});
