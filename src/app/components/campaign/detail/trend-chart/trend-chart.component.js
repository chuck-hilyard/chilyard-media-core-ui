import template from './trend-chart.html';
import metricsConfig from './configs/metrics';

class Controller {

  constructor($filter, rlColors) {
    'ngInject';
    this.$filter = $filter;
    this.chart = {};
    this.colors = [
      rlColors.charts[4].shades[0],
      rlColors.charts[2].shades[0]
    ];
    this.hoverColors = [
      rlColors.charts[4].shades[1],
      rlColors.charts[2].shades[1]
    ];
    this.options = metricsConfig;
    this.metrics = [
      this.options.find((item) => item.id === 'impressions'),
      this.options.find((item) => item.id === 'spend')
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
    this.chart = {
      type: 'bar',
      data: {
        labels: $ctrl.setLabels(data),
        datasets: $ctrl.setData(data)
      },
      options: $ctrl.setOptions()
    };
  }

  filterOptions(index) {
    return this.options.filter((item) => {
      if (this.metrics[index].id !== item.id) {
        return item;
      }
    });
  }

  getTotals(metric) {
    if (!this.data) {
      return 0;
    }
    let total = 0;
    angular.forEach(this.data, (item) => {
      total +=item[metric.id];
    });
    if(metric.format === 'currency') {
      return this.$filter('currency')(total);
    }
    if(metric.total === 'average') {
      total = total / this.data.length;
      return this.$filter('number')(total);
    }
    return this.$filter('number')(total);
  }

  setLabels(data) {
    return data.map((item) => {
      return item.cycleNumber;
    });
  }

  setData(data) {
    return [
      {
        backgroundColor: this.colors[0],
        borderColor: this.colors[0],
        data: data.map((item) => item[this.metrics[0].id]),
        fill: false,
        label: this.metrics[0].label,
        lineTension: 0,
        pointRadius: 0,
        type: 'line',
        yAxisID: 'left'
      },
      {
        backgroundColor: this.colors[1],
        borderColor: this.colors[1],
        data: data.map((item) => item[this.metrics[1].id]),
        hoverBackgroundColor: this.hoverColors[1],
        hoverBorderColor: this.hoverColors[1],
        label: this.metrics[1].label,
        yAxisID: 'right'
      }
    ];
  }

  setOptions() {
    let yAxes = [];
    this.metrics.forEach((metric, index) => {
      let position = (index === 0) ? 'left' : 'right';
      let axis = {
        id: position,
        position: position,
        gridLines: {
          drawBorder: false,
          drawTicks: false
        }
      };
      switch(metric.format) {
      case 'currency':
        axis.ticks = {
          callback: (dataLabel) => this.$filter('currency')(dataLabel)
        };
        break;
      }
      yAxes.push(axis);
    });

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
        ],
        yAxes: yAxes
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'index'
      }
    };
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
