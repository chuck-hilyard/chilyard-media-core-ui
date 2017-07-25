import mockdata from '../../../../../../test/mocks/components/campaign/device/device';
import mockChart from './mock-data/chart';
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
    let expectedMetric = metricsConfig.find((item) => item.id === 'impressions');
    expect($ctrl.chart).toEqual({});
    expect($ctrl.options).toEqual(metricsConfig);
    expect($ctrl.metric).toEqual(expectedMetric);
  });

  it('builds chart json object', () => {
    $ctrl.build(mockdata);
    expect($ctrl.metricData).toEqual(mockChart.metricData);
    expect($ctrl.chart.data.datasets[0].data).toEqual(mockChart.data);
    expect($ctrl.chart.options.elements.center).toEqual(mockChart.center);
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
