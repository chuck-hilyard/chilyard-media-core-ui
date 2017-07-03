import template from './age-gender-chart.html';
import metricsConfig from './configs/metrics';

class Controller {

  constructor($filter) {
    'ngInject';
    this.$filter = $filter;

    this.colors = [
      {
        male: '#23a4a9',
        female: '#bdd964'
      },
      {
        male: '#2b97ce',
        female: '#a26da9'
      }
    ];
    this.chart1 = {};
    this.chart2 = {};
    this.labels = ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'];
    this.metricOptions = metricsConfig;
    this.metrics = [
      this.metricOptions.find((item) => item.id === 'impressions'),
      this.metricOptions.find((item) => item.id === 'spend')
    ];
  }

  $onChanges(changes) {
    let currentData = changes.data.currentValue;
    if(currentData) {
      this.build(currentData);
    }
  }

  build(data) {
    let $ctrl = this;
    this.chart1 = {
      type: 'horizontalBar',
      data: {
        labels: this.labels,
        datasets: $ctrl.setDatasets(data, 0)
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawBorder: false
              },
              ticks: {
                beginAtZero: true,
                callback: (value) => (value * -1)
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                fontColor: '#fff'
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let di = tooltipItem.datasetIndex;
              return data.datasets[di].label + ': ' + tooltipItem.xLabel * -1;
            }
          }
        }
      }
    };

    this.chart2 = {
      type: 'horizontalBar',
      data: {
        labels: this.labels,
        datasets: $ctrl.setDatasets(data, 1)
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawBorder: false
              },
              ticks: {
                beginAtZero: true,
                callback: (value) => this.$filter('currency')(value)
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                padding: 30,
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let di = tooltipItem.datasetIndex;
              return data.datasets[di].label + ': ' + this.$filter('currency')(tooltipItem.xLabel);
            }
          }
        }
      }
    };
  }

  setDatasets(data, index) {
    let metric = this.metrics[index];
    let metricData = data.find((item) => item.metricName === metric.id);
    let modifier = index === 0 ? -1 : 1;
    return [
      {
        label: `Male ${metric.label}`,
        data: metricData.male.ageGroups.map((item) => item.total * modifier),
        backgroundColor: this.colors[index].male,
        borderColor: this.colors[index].male,
      },
      {
        label: 'Female Impressions',
        data: metricData.female.ageGroups.map((item) => item.total * modifier),
        backgroundColor: this.colors[index].female,
        borderColor: this.colors[index].female,
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

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    data: '<'
  }
};
