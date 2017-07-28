import mockData from '../../../../../../test/mocks/components/campaign/age-gender/age-gender';
import cyclesMetrics from './mock-data/cyclesMetrics';
import cyclesChart from './mock-data/cyclesChart';
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
        data: {}
      };
      $ctrl = $componentController('campaignAgeGenderChart', locals, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.charts).toEqual([]);
    expect($ctrl.chartData).toEqual([]);
    expect($ctrl.metricOptions).toEqual([]);
    expect($ctrl.metrics).toEqual([]);
  });

  describe('intial data load `$onChange`', () => {
    beforeEach(() => {
      $ctrl.$onChanges({
        data: {
          currentValue: mockData
        }
      });
    });

    it('populates metricOptions and metrics arrays', () => {
      let expectedMetrics = [
        metricsConfig.find((item) => item.metricName === 'impressions'),
        metricsConfig.find((item) => item.metricName === 'pageEngagements')
      ];
      expect($ctrl.metricOptions).toEqual(cyclesMetrics);
      expect($ctrl.metrics).toEqual(expectedMetrics);
    });

    it('builds charts array of json objects', () => {
      let tooltipItem = {
        xLabel: 1000,
        datasetIndex: 0
      };
      let data = {
        datasets: [{
          label: 'Male Impressions'
        }, {
          label: 'Female Impressions'
        }]
      };
      // Chart 1 data should have negative values to spoof right to left alignment
      expect($ctrl.charts[0].data.datasets[0].label).toBe(cyclesChart[0].datasets[0].label);
      expect($ctrl.charts[0].data.datasets[0].data).toEqual(cyclesChart[0].datasets[0].data);
      expect($ctrl.charts[0].data.datasets[1].label).toBe(cyclesChart[0].datasets[1].label);
      expect($ctrl.charts[0].data.datasets[1].data).toEqual(cyclesChart[0].datasets[1].data);
      expect($ctrl.charts[0].options.scales.xAxes[0].ticks.suggestedMin).toBe(-1);
      expect($ctrl.charts[0].options.scales.xAxes[0].ticks.callback(-1000)).toBe('1,000');
      expect($ctrl.charts[0].options.tooltips.callbacks.label(tooltipItem, data)).toBe('Male Impressions: -1,000');
      tooltipItem.datasetIndex = 1;
      expect($ctrl.charts[0].options.tooltips.callbacks.label(tooltipItem, data)).toBe('Female Impressions: -1,000');

      // Chart 2 tests
      expect($ctrl.charts[1].data.datasets[0].label).toBe(cyclesChart[1].datasets[0].label);
      expect($ctrl.charts[1].data.datasets[0].data).toEqual(cyclesChart[1].datasets[0].data);
      expect($ctrl.charts[1].data.datasets[1].label).toBe(cyclesChart[1].datasets[1].label);
      expect($ctrl.charts[1].data.datasets[1].data).toEqual(cyclesChart[1].datasets[1].data);
      expect($ctrl.charts[1].options.scales.xAxes[0].ticks.suggestedMin).toBe(1);
      expect($ctrl.charts[1].options.scales.xAxes[0].ticks.callback(1000)).toBe('1,000');
      tooltipItem.datasetIndex = 0;
      expect($ctrl.charts[1].options.tooltips.callbacks.label(tooltipItem, data)).toBe('Male Impressions: 1,000');
      tooltipItem.datasetIndex = 1;
      expect($ctrl.charts[1].options.tooltips.callbacks.label(tooltipItem, data)).toBe('Female Impressions: 1,000');
    });

    it('dropdowns filter out other selected metrics', () => {
      let filtered = $ctrl.filterOptions(1);
      let expected = $ctrl.metricOptions;
      expected.splice(2, 1);
      expect(filtered).toEqual(expected);
    });
  });

  describe('change chart metric', () => {
    it('updates chart', () => {
      spyOn($ctrl, 'build');
      $ctrl.updateChart();
      expect($ctrl.build).toHaveBeenCalled();
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
