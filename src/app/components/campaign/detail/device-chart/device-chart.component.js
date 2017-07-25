import template from './device-chart.html';
import metricsConfig from './configs/metrics';

class DeviceChartController {

  constructor($filter, rlColors) {
    'ngInject';
    this.$filter = $filter;

    this.chart = {};
    this.colors = [
      rlColors.charts[4].shades[0],
      rlColors.charts[4].shades[1],
      rlColors.charts[4].shades[2],
      rlColors.charts[4].shades[3]
    ];
    this.labels = ['Mobile', 'Desktop', 'Tablet', 'Other'];
    this.options = metricsConfig;
    this.metric = this.options.find((item) => item.id === 'impressions');
    this.metricData = [];
  }

  $onChanges(changes) {
    let currentData = (changes.data) ? changes.data.currentValue : null;
    if (currentData && !this.isError(currentData)) {
      this.build(currentData);
    }
  }

  build(data) {
    let $ctrl = this;
    this.chart = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: $ctrl.setDataset(data),
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
        elements: {
          center: $ctrl.setCenterData(data)
        }
      }
    };
  }

  isError(data) {
    let object = data || this.data;
    return object instanceof Error;
  }

  setCenterData(data) {
    let metricData = data.find((item) => item.metric === this.metric.id);
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
      line2: this.metric.label,
      line2Padding: 35,
      fontFamily: '\'Roboto\', sans-serif',
      fontColor: '#333'
    };
  }

  setDataset(data) {
    let metricData = data.find((item) => item.metric === this.metric.id);
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

  updateChart() {
    this.build(this.data);
  }

}

export default {
  template: template,
  controller: DeviceChartController,
  bindings: {
    data: '<'
  }
};
