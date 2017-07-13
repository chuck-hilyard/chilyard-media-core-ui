import template from './device-chart.html';
import metricsConfig from './configs/metrics';

class Controller {

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
  }

  $onChanges(changes) {
    let currentData = changes.data.currentValue;
    if(currentData) {
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
      line2Padding: 30,
      fontFamily: '\'Roboto\', sans-serif',
      fontColor: '#333'
    };
  }

  setDataset(data) {
    let metricData = data.find((item) => item.metric === this.metric.id);
    return metricData.breakdowns.map((item) => item.percentage);
  }

  updateChart() {
    this.build(this.data);
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    data: '<'
  }
};
