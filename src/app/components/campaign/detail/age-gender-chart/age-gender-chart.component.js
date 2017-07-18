import template from './age-gender-chart.html';
import metricsConfig from './configs/metrics';

class Controller {

  constructor($filter, rlColors) {
    'ngInject';
    this.$filter = $filter;
    this.colors = [
      {
        male: rlColors.charts[4].shades[0],
        female: rlColors.charts[2].shades[0]
      },
      {
        male: rlColors.charts[1].shades[0],
        female: rlColors.charts[6].shades[0]
      }
    ];
    this.charts = [];
    this.labels = ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'];
    this.metricOptions = metricsConfig;
    this.metrics = [
      this.metricOptions.find((item) => item.id === 'impressions'),
      this.metricOptions.find((item) => item.id === 'pageEngagements')
    ];
  }

  $onChanges(changes) {
    let currentData = changes.data.currentValue;
    if(currentData) {
      this.build(currentData);
    }
  }

  build(data) {
    if (data instanceof Error) {
      this.charts = [];
      return;
    }
    let $ctrl = this;
    this.charts = [
      {
        type: 'horizontalBar',
        data: {
          labels: this.labels,
          datasets: $ctrl.setDatasets(data, 0)
        },
        options: $ctrl.setOptions(0)
      },
      {
        type: 'horizontalBar',
        data: {
          labels: this.labels,
          datasets: $ctrl.setDatasets(data, 1)
        },
        options: $ctrl.setOptions(1)
      }
    ];
  }

  filterOptions(index) {
    return this.metricOptions.filter((item) => {
      if (this.metrics[index].id !== item.id) {
        return item;
      }
    });
  }

  getTotals(index, gender) {
    if (!this.data || this.data instanceof Error) {
      return {
        percentage: 0,
        total: 0
      };
    }
    let metric = this.metrics[index];
    let metricData = this.data.find((item) => item.metricName === metric.id);

    let total = 0;
    if (typeof(metricData) !== 'undefined') {
      if (metric.format === 'currency') {
        total = this.$filter('currency')(metricData[gender].total);
      }
      else {
        total = this.$filter('number')(metricData[gender].total);
      }
    }
    return {
      percentage: (metricData) ? metricData[gender].percentage : 0,
      total: total
    };
  }

  isError() {
    return this.data instanceof Error;
  }

  setDatasets(data, index) {
    let metric = this.metrics[index];
    let metricData = data.find((item) => item.metricName === metric.id);
     // Chart 1 data should have negative values to force right to left alignment
    let modifier = index === 0 ? -1 : 1;
    return [
      {
        label: `Male ${metric.label}`,
        data: (metricData) ? metricData.male.ageGroups.map((item) => item.total * modifier) : [],
        backgroundColor: this.colors[index].male,
        borderColor: this.colors[index].male,
      },
      {
        label: `Female ${metric.label}`,
        data: (metricData) ? metricData.female.ageGroups.map((item) => item.total * modifier) : [],
        backgroundColor: this.colors[index].female,
        borderColor: this.colors[index].female,
      }
    ];
  }

  setOptions(index) {
    let modifier = index === 0 ? -1 : 1;
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          this.setXAxis(index)
        ],
        yAxes: [
          this.setYAxis(index)
        ]
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            let di = tooltipItem.datasetIndex;
            return `${data.datasets[di].label}: ${tooltipItem.xLabel * modifier}`;
          }
        }
      }
    };
  }

  setXAxis(index) {
    let metric = this.metrics[index];
    let modifier = index === 0 ? -1 : 1;
    let xAxis = {
      gridLines: {
        drawBorder: false
      },
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 3,
        suggestedMin: (1 * modifier),
        suggestedMax: 0
      }
    };
    if (metric.format === 'currency') {
      xAxis.ticks.callback = (value) => this.$filter('currency')(value * modifier);
    }
    else {
      xAxis.ticks.callback = (value) => this.$filter('number')(value * modifier);
    }
    return xAxis;
  }

  setYAxis(index) {
    let yAxis = {
      gridLines: {
        drawBorder: false,
        display: false
      }
    };
    if (index === 0) {
      yAxis.ticks = {
        fontColor: '#fff'
      };
    }
    else {
      yAxis.ticks = {
        padding: 30
      };
    }
    return yAxis;
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
