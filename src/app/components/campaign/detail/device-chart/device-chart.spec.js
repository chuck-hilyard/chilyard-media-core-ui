import mockData from '../../../../../../test/mocks/components/campaign/device/device';
import cyclesMetrics from './mock-data/cyclesMetrics';
import cyclesChart from './mock-data/cyclesChart';
import metricsConfig from './configs/metrics';


describe('campaign.detail.device-chart', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('common.colors');
    angular.mock.module('campaign.detail.device-chart');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let locals = {};
      let bindings = {
        data: {}
      };
      $ctrl = $componentController('campaignDeviceChart', locals, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.chart).toEqual({});
    expect($ctrl.chartData).toEqual([]);
    expect($ctrl.metricOptions).toEqual([]);
    expect($ctrl.metric).toEqual({});
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
      let expectedMetrics = metricsConfig.find((item) => item.metricName === 'impressions');
      expect($ctrl.metricOptions).toEqual(cyclesMetrics);
      expect($ctrl.metric).toEqual(expectedMetrics);
    });

    it('builds chart json object', () => {
      let tooltipItem = {
        index: 0,
        datasetIndex: 0
      };
      let data = {
        datasets: [{
          data: [10, 20]
        }]
      };
      expect($ctrl.metricData).toEqual(cyclesChart.metricData);
      expect($ctrl.chart.data.datasets[0].data).toEqual(cyclesChart.data);
      expect($ctrl.chart.options.elements.center).toEqual(cyclesChart.center);
      expect($ctrl.chart.options.tooltips.callbacks.label(tooltipItem, data)).toBe('10%');
      tooltipItem.index = 1;
      expect($ctrl.chart.options.tooltips.callbacks.label(tooltipItem, data)).toBe('20%');
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
