import template from './detail.html';
import utilizationTooltip from './tooltips/utilization.html';
import impressionsTooltip from './tooltips/impressions.html';
import cpmTooltip from './tooltips/cpm.html';
import ctrTooltip from './tooltips/ctr.html';
import allClicksTooltip from './tooltips/all-clicks.html';
import frequencyTooltip from './tooltips/frequency.html';
import reachTooltip from './tooltips/reach.html';
import socialReachTooltip from './tooltips/social-reach.html';
import socialImpressionsTooltip from './tooltips/social-impressions.html';
import websiteClickTooltip from './tooltips/website-clicks.html';
import buttonClicksTooltip from './tooltips/button-clicks.html';
import linkClicksTooltip from './tooltips/link-clicks.html';
import socialClicksTooltip from './tooltips/social-clicks.html';
import leadFormsTooltip from './tooltips/lead-forms.html';
import checkInsTooltip from './tooltips/check-ins.html';
import postCommentsTooltip from './tooltips/post-comments.html';
import postReactionsTooltip from './tooltips/post-reactions.html';
import postSharesTooltip from './tooltips/post-shares.html';
import postEngagementTooltip from './tooltips/post-engagement.html';
import pageLikesTooltip from './tooltips/page-likes.html';
import pageEngagementTooltip from './tooltips/page-engagement.html';

class Controller {

  constructor($filter, $sce, $scope, CampaignDetailService, CampaignSidebar, CampaignTrendChart, Session) {
    'ngInject';
    // Anuglar
    this.$filter = $filter;

    // Local Vars
    this.gridData = {};
    this.metrics = this.setMetrics();
    this.session = Session;
    this.service = CampaignDetailService;
    this.sortState = {};
    this.tableDelegate = {};

    // Tooltip templates
    this.tooltips = {
      utilization: $sce.trustAsHtml(utilizationTooltip),
      impressions: $sce.trustAsHtml(impressionsTooltip),
      cpm: $sce.trustAsHtml(cpmTooltip),
      ctr: $sce.trustAsHtml(ctrTooltip),
      allClicks: $sce.trustAsHtml(allClicksTooltip),
      frequency: $sce.trustAsHtml(frequencyTooltip),
      reach: $sce.trustAsHtml(reachTooltip),
      socialReach: $sce.trustAsHtml(socialReachTooltip),
      socialImpressions: $sce.trustAsHtml(socialImpressionsTooltip),
      websiteClicks: $sce.trustAsHtml(websiteClickTooltip),
      buttonClicks: $sce.trustAsHtml(buttonClicksTooltip),
      linkClicks: $sce.trustAsHtml(linkClicksTooltip),
      socialClicks: $sce.trustAsHtml(socialClicksTooltip),
      leadForms: $sce.trustAsHtml(leadFormsTooltip),
      checkIns: $sce.trustAsHtml(checkInsTooltip),
      postComments: $sce.trustAsHtml(postCommentsTooltip),
      postReactions: $sce.trustAsHtml(postReactionsTooltip),
      postShares: $sce.trustAsHtml(postSharesTooltip),
      postEngagement: $sce.trustAsHtml(postEngagementTooltip),
      pageLikes: $sce.trustAsHtml(pageLikesTooltip),
      pageEngagement: $sce.trustAsHtml(pageEngagementTooltip)
    };

    this.trendChart = angular.copy(CampaignTrendChart);

    $scope.$watch(() => CampaignSidebar.collapsed, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.tableDelegate.resize();
      }
    });

    $scope.$watch(() => Session.dateRange, () => {
      this.getTrendData();
      this.getPerformanceData();
    }, true);

    // FPO RANDOM CHART DATA
    // TODO: REPLACE
    this.demographicChart = {};
    this.setDemographicChart();
    this.deviceChart = {};
    this.setDeviceChart();
  }

  $onInit() {
    this.campaign = this.campaignRequest.data.campaign;
    this.getTrendData();
    this.getPerformanceData();
  }

  dateRangeToString() {
    let start = this.$filter('date')(this.session.dateRange.start, 'yyyy-MM-dd');
    let end = this.$filter('date')(this.session.dateRange.end, 'yyyy-MM-dd');
    return `${start},${end}`;
  }

  getTrendData() {
    let metrics = this.metrics.trend.map((item) => item.id);
    let params = {
      dates: this.dateRangeToString(),
      metrics: metrics.toString()
    };
    this.service.getTrendData(this.campaign.mcid, params)
      .then((response) => {
        this.trendChart.build('bar', response.data, this.metrics.trend);
      })
      .catch((error) => {
        throw new Error('GET TREND DATA ERROR: ', JSON.stringify(error));
      });
  }

  getPerformanceData() {
    let params = {
      dates: this.dateRangeToString(),
    };
    this.service.getPerformanceData(this.campaign.mcid, params)
      .then((response) => {
        this.gridData = response.data;
      })
      .catch((error) => {
        throw new Error('GET PERFORMANCE DATA ERROR: ', JSON.stringify(error));
      });
  }

  handleSort(state) {
    this.sortState = state;
  }

  handleNextPage() {
    angular.noop();
  }

  setMetrics() {
    let options = [
      {
        id: 'impressions',
        format: 'int',
        label: 'Impressions',
        type: 'line'
      },
      {
        id: 'clicks',
        format: 'int',
        label: 'Clicks',
        type: 'line'
      },
      {
        id: 'ctr',
        format: 'float',
        label: 'CTR',
        type: 'line'
      },
      {
        id: 'spend',
        format: 'currency',
        label: 'Spend',
        type: 'bar'

      }
    ];
    return {
      options: options,
      demographics: [
        options.find((item) => item.id === 'impressions'),
        options.find((item) => item.id === 'spend')
      ],
      devices: [
        options.find((item) => item.id === 'impressions')
      ],
      trend: [
        options.find((item) => item.id === 'impressions'),
        options.find((item) => item.id === 'spend')
      ]
    };
  }

  metricFilter(attr, index) {
    return this.metrics.options.filter((item) => {
      if(this.metrics[attr][index].id !== item.id) {
        return item;
      }
    });
  }

  // FPO RANDOM CHART DATA
  // TODO: REPLACE
  randomNumber(multiplier, roundMethod) {
    switch(roundMethod) {
    case 'none':
      return Math.random() * multiplier;
    case 'ceil':
      return Math.ceil(Math.random() * multiplier);
    case 'floor':
    default:
      return Math.floor(Math.random() * multiplier);
    }
  }

  setDemographicChart() {
    let chart = this.demographicChart;

    chart.colors = {
      metric1: {
        male: '#23a4a9',
        female: '#bdd964'
      },
      metric2: {
        male: '#2b97ce',
        female: '#a26da9'
      }
    };

    chart.metric1 = {
      type: 'horizontalBar',
      data: {
        labels: ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [
          {
            label: 'Male Impressions',
            data: [],
            backgroundColor: chart.colors.metric1.male,
            borderColor: chart.colors.metric1.male,
          },
          {
            label: 'Female Impressions',
            data: [],
            backgroundColor: chart.colors.metric1.female,
            borderColor: chart.colors.metric1.female,
          }
        ]
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

    chart.metric2 = {
      type: 'horizontalBar',
      data: {
        labels: ['13-17', '18-24', '24-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [
          {
            label: 'Male Spend',
            data: [],
            backgroundColor: chart.colors.metric2.male,
            borderColor: chart.colors.metric2.male,
          },
          {
            label: 'Female Spend',
            data: [],
            backgroundColor: chart.colors.metric2.female,
            borderColor: chart.colors.metric2.female,
          }
        ]
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

    for(let i = 1; i <= 8; i++) {
      chart.metric1.data.datasets[0].data.push(this.randomNumber(500) * -1);
      chart.metric1.data.datasets[1].data.push(this.randomNumber(500) * -1);
      chart.metric2.data.datasets[0].data.push(this.randomNumber(20));
      chart.metric2.data.datasets[1].data.push(this.randomNumber(20));
    }
  }

  setDeviceChart() {
    let chart = this.deviceChart;
    let mobileColor = '#23a4a9';
    let desktopColor = '#7bc8cb';

    let totalCount = 100;
    let desktopCount = this.randomNumber(totalCount);

    chart.chart = {
      type: 'pie',
      data: {
        labels: [
          'Desktop',
          'Mobile'
        ],
        datasets: [{
          data: [
            desktopCount,
            (totalCount - desktopCount)
          ],
          backgroundColor: [
            desktopColor,
            mobileColor
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        cutoutPercentage: 80,
        elements: {
          center: {
            line1: '46,555',
            line1Padding: 50,
            line2: 'Impressions',
            line2Padding: 50,
            fontColor: '#394354'
          }
        }
      }
    };

  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignRequest: '<'
  }
};
