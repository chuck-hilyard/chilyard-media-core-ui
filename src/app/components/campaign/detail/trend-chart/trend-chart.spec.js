import cycleData from '../../../../../../test/mocks/components/campaign/performance/cycles';
import monthsData from '../../../../../../test/mocks/components/campaign/performance/months';
import cyclesMetrics from './mock-data/cyclesMetrics';
import cyclesChart from './mock-data/cyclesChart';
import monthsMetrics from './mock-data/monthsMetrics';
import monthsChart from './mock-data/monthsChart';
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
    expect($ctrl.chart).toEqual({});
    expect($ctrl.metricOptions).toEqual([]);
    expect($ctrl.metrics).toEqual([]);
  });

  describe('intial data load `$onChange`', () => {
    beforeEach(() => {
      $ctrl.$onChanges({
        data: {
          currentValue: cycleData
        }
      });
    });

    it('builds chart json object', () => {
      expect($ctrl.chart.data.labels).toEqual(cyclesChart.labels);
      angular.forEach($ctrl.chart.data.datasets, (item, index) => {
        expect(item.data).toEqual(cyclesChart.datasets[index]);
      });
      let yAxes = $ctrl.chart.options.scales.yAxes;
      expect(yAxes[0].position).toBe('left');
      expect(yAxes[0].ticks.callback(1000)).toBe('1,000');
      expect(yAxes[1].position).toBe('right');
      expect(yAxes[1].ticks.callback(1000)).toBe('$1,000.00');

      $ctrl.$onChanges({
        data: {
          currentValue: monthsData
        }
      });
      expect($ctrl.chart.data.labels).toEqual(monthsChart.labels.reverse());
      angular.forEach($ctrl.chart.data.datasets, (item, index) => {
        expect(item.data).toEqual(monthsChart.datasets[index].reverse());
      });
    });

    it('populates metricOptions and metrics arrays', () => {
      let expectedMetrics = [
        metricsConfig.find((item) => item.metricName === 'impressions'),
        metricsConfig.find((item) => item.metricName === 'spend')
      ];
      expect($ctrl.metricOptions).toEqual(cyclesMetrics);
      expect($ctrl.metrics).toEqual(expectedMetrics);

      $ctrl.metrics = [];
      $ctrl.$onChanges({
        data: {
          currentValue: monthsData
        }
      });
      expect($ctrl.metricOptions).toEqual(monthsMetrics);
      expect($ctrl.metrics).toEqual(expectedMetrics);
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
