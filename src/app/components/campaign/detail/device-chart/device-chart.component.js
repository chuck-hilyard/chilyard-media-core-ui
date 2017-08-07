import template from './device-chart.html';
import metricsConfig from './configs/metrics';
const me = 'Device Chart Controller';
const metricDefault = 'impressions';

class DeviceChartController {

  constructor($filter, rlColors, rlLogger) {
    'ngInject';
    this.$filter = $filter;
    this.Logger = rlLogger;

    this.chart = {};
    this.chartData = [];
    this.colors = [
      rlColors.charts[4].shades[0],
      rlColors.charts[4].shades[1],
      rlColors.charts[4].shades[2],
      rlColors.charts[4].shades[3]
    ];
    this.labels = ['Mobile', 'Desktop', 'Tablet', 'Other'];
    this.metricOptions = [];
    this.metric = {};
    this.metricData = [];
  }

  $onChanges(changes) {
    let currentData = (changes.data) ? changes.data.currentValue : null;
    this.Logger.trace('$onChanges', {changes: changes, currentData: currentData}, me);
    if (currentData && !this.isError(currentData)) {
      this.chartData = currentData;
      this.setMetric();
      this.build();
    }
  }

  build() {
    let $ctrl = this;
    this.chart = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: $ctrl.setDataset(),
          backgroundColor: this.colors
        }],
        labels: this.labels
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
            label: (tooltipItem, data) => `${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}%`
          }
        },
        elements: {
          center: $ctrl.setCenterData()
        }
      }
    };
  }

  isError(data) {
    let object = data || this.data;
    return object instanceof Error;
  }

  setCenterData() {
    let metricData = this.chartData.find((item) => item.metricName === this.metric.metricName);
    let total = 0;
    switch (this.metric.format) {
      case 'currency':
        total = this.$filter('currency')(metricData.total);
        break;
      default:
        total = this.$filter('number')(metricData.total);
    }
    return {
      line1: total,
      line1Padding: 50,
      line2: this.metric.displayName,
      line2Padding: 35,
      fontFamily: '\'Roboto\', sans-serif',
      fontColor: '#333'
    };
  }

  setDataset() {
    let metricData = this.chartData.find((item) => item.metricName === this.metric.metricName);
    if (metricData.breakdowns.length === 0) {
      return;
    }
    let dataset = [];
    this.metricData = [];
    angular.forEach(this.labels, (label) => {
      let type = metricData.breakdowns.find((item) => item.type === label);
      dataset.push(type.percentage);
      this.metricData.push(type);
    });
    return dataset;
  }

  setMetric() {
    this.metricOptions = [];
    let keys = this.chartData.map((item) => item.metricName);
    angular.forEach(metricsConfig, (value) => {
      if (keys.indexOf(value.metricName) > -1) {
        this.metricOptions.push(angular.copy(value));
      }
    });
    this.metric = this.metricOptions.find((item) => item.metricName === metricDefault);
  }

  updateChart(metric) {
    this.Logger.info('Device chart metric changed', metric.displayName, me);
    this.build();
  }

}

export default {
  template: template,
  controller: DeviceChartController,
  bindings: {
    data: '<',
    loading: '<'
  }
};
