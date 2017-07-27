import template from './age-gender-chart.html';
import metricsConfig from './configs/metrics';


const metricDefaults = [
  'impressions',
  'pageEngagements'
];

class AgeGenderController {

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
    this.chartData = [];
    this.labels = ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'];
    this.metricOptions = [];
    this.metrics = [];
  }

  $onChanges(changes) {
    let currentData = (changes.data) ? changes.data.currentValue : null;
    if (currentData && !this.isError(currentData)) {
      this.chartData = currentData;
      this.setMetrics();
      this.build();
    }
  }

  build() {
    let $ctrl = this;
    this.charts = [
      {
        type: 'horizontalBar',
        data: {
          labels: this.labels,
          datasets: $ctrl.setDatasets(0)
        },
        options: $ctrl.setOptions(0)
      },
      {
        type: 'horizontalBar',
        data: {
          labels: this.labels,
          datasets: $ctrl.setDatasets(1)
        },
        options: $ctrl.setOptions(1)
      }
    ];
  }

  filterOptions(index) {
    return this.metricOptions.filter((item) => {
      if (this.metrics[index].metricName !== item.metricName) {
        return item;
      }
    });
  }

  getTotals(index, gender) {
    if (!this.chartData || this.isError()) {
      return {
        percentage: 0,
        total: 0
      };
    }
    let metric = this.metrics[index];
    let metricData = this.chartData.find((item) => item.metricName === metric.metricName);

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

  isError(data) {
    let object = data || this.data;
    return object instanceof Error;
  }

  setDatasets(index) {
    let metric = this.metrics[index];
    let metricData = this.chartData.find((item) => item.metricName === metric.metricName);
     // Chart 1 data should have negative values to force right to left alignment
    let modifier = index === 0 ? -1 : 1;
    return [
      {
        label: `Male ${metric.displayName}`,
        data: (metricData) ? metricData.male.ageGroups.map((item) => item.total * modifier) : [],
        backgroundColor: this.colors[index].male,
        borderColor: this.colors[index].male
      },
      {
        label: `Female ${metric.displayName}`,
        data: (metricData) ? metricData.female.ageGroups.map((item) => item.total * modifier) : [],
        backgroundColor: this.colors[index].female,
        borderColor: this.colors[index].female
      }
    ];
  }

  setMetrics() {
    this.metricOptions = [];
    let keys = this.chartData.map((item) => item.metricName);
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
    this.build();
  }

}
export default {
  template: template,
  controller: AgeGenderController,
  bindings: {
    data: '<',
    loading: '<'
  }
};
