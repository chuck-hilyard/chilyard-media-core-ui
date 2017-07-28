import template from './trend-chart.html';
import metricsConfig from './configs/metrics';

const me = 'Trend Chart Controller';
const metricDefaults = [
  'impressions',
  'spend'
];

class TrendChartController {

  constructor($filter, rlColors, rlLogger) {
    'ngInject';
    this.$filter = $filter;
    this.Logger = rlLogger;
    this.chart = {};
    this.chartData = [];
    this.colors = [
      rlColors.charts[4].shades[0],
      rlColors.charts[2].shades[0]
    ];
    this.hoverColors = [
      rlColors.charts[4].shades[1],
      rlColors.charts[2].shades[1]
    ];
    this.metricOptions = [];
    this.metrics = [];
  }

  $onChanges(changes) {
    let currentData = (changes.data) ? changes.data.currentValue : null;
    this.Logger.trace('$onChanges', {breakdownType: this.breakdownType, changes: changes, currentData: currentData}, me);
    if (currentData && !this.isError(currentData)) {
      if (this.breakdownType === 'cycles') {
        this.chartData = angular.copy(currentData.data);
      }
      else {
        this.chartData = angular.copy(currentData);
      }
      this.chartData.reverse();
      this.setMetrics();
      this.build();
    }
  }

  build() {
    let $ctrl = this;
    this.chart = {
      type: 'bar',
      data: {
        labels: $ctrl.setLabels(),
        datasets: $ctrl.setData()
      },
      options: $ctrl.setOptions()
    };
  }

  filterOptions(index) {
    return this.metricOptions.filter((item) => {
      if (this.metrics[index].metricName !== item.metricName) {
        return item;
      }
    });
  }

  getTotals() {
    return 0;
  }

  isError(data) {
    let object = data || this.data;
    return object instanceof Error;
  }

  metricFormat(metric, data) {
    switch (metric.format) {
      case 'currency':
        return this.$filter('currency')(data);
      default:
        return this.$filter('number')(data);
    }
  }

  setLabels() {
    return this.chartData.map((item) => {
      return item.chartLabel;
    });
  }

  setData() {
    return [
      {
        backgroundColor: this.colors[0],
        borderColor: this.colors[0],
        data: this.chartData.map((item) => item[this.metrics[0].metricName]),
        fill: false,
        label: this.metrics[0].label,
        lineTension: 0.1,
        pointRadius: 0,
        type: 'line',
        yAxisID: 'left'
      },
      {
        backgroundColor: this.colors[1],
        borderColor: this.colors[1],
        data: this.chartData.map((item) => item[this.metrics[1].metricName]),
        hoverBackgroundColor: this.hoverColors[1],
        hoverBorderColor: this.hoverColors[1],
        label: this.metrics[1].label,
        yAxisID: 'right'
      }
    ];
  }

  setMetrics() {
    this.metricOptions = [];
    let keys = Object.keys(this.chartData[0]);
    angular.forEach(metricsConfig, (value) => {
      if (keys.indexOf(value.metricName) > -1) {
        this.metricOptions.push(angular.copy(value));
      }
    });
    this.metrics = [
      this.metricOptions.find((item) => item.metricName === metricDefaults[0]),
      this.metricOptions.find((item) => item.metricName === metricDefaults[1])
    ];
  }

  setOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      animation: {
        duration: 0
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: this.setYAxes()
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'index',
        callbacks: {
          label: (tooltipItem) => this.metricFormat(this.metrics[tooltipItem.datasetIndex], tooltipItem.yLabel)
        }
      }
    };
  }

  setYAxes() {
    let yAxes = [];
    this.metrics.forEach((metric, index) => {
      let position = (index === 0) ? 'left' : 'right';
      let axis = {
        id: position,
        position: position,
        gridLines: {
          drawBorder: false,
          drawTicks: false
        },
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 3,
          callback: (dataLabel) => this.metricFormat(metric, dataLabel)
        }
      };
      yAxes.push(axis);
    });
    return yAxes;
  }

  updateChart() {
    this.build();
  }

}

export default {
  template: template,
  controller: TrendChartController,
  bindings: {
    data: '<',
    breakdownType: '<',
    loading: '<'
  }
};
