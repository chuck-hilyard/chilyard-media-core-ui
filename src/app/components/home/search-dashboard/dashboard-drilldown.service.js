class DrillDownService {

  constructor($filter) {
    'ngInject';
    this.$filter = $filter;
    this.drilldownViewItemList = [];
  }

  userDashboardDrilldownViewCtrl(campaignDetails, details, colorScheme) {
    this.drilldownDetails = details;
    this.campaignDetails = campaignDetails;

    // Make the sort of values each member of drilldown view require
    let drilldownItemSequence = {
      currentCycle: {index: 0, title: 'This Cycle'},
      lastCycle: {index: 1, title: 'Last Cycle'},
      lastYear_5_days: {index: 2, title: 'Last Year'},
      lastYear_10_days: {index: 3, title: 'Last Year'},
      lastYear_15_days: {index: 4, title: 'Last Year'},
      lastYear_20_days: {index: 5, title: 'Last Year'},
      lastYear_25_days: {index: 6, title: 'Last Year'},
      lastYear_30_days: {index: 7, title: 'Last Year'},
      bscBenchmark: {index: 8, title: 'BSC Benchmark - '}
    };

    for (let key in this.drilldownDetails) {
      if (this.drilldownDetails.hasOwnProperty(key)) {
        this.drilldownViewItemList[drilldownItemSequence[key].index] = {
          drilldownItemRowIndex: drilldownItemSequence[key].index,
          drilldownRowIndex: this.drilldownRowIndex,
          title: drilldownItemSequence[key].title+(key === 'bscBenchmark' ? this.drilldownDetails[key].category : ''),
          startDate: this.drilldownDetails[key].startDate,
          endDate: this.drilldownDetails[key].endDate,
          lastYear: this.getMetricDisplayValue(this.drilldownDetails[key].lastYear),
          priority: '',
          budget: this.formatToCurrency(this.drilldownDetails[key].campaignBudget, this.drilldownDetails[key].campaignCurrency, 0),
          clientSentimentScore: this.getMetricDisplayValue(this.drilldownDetails[key].sentimentValue),
          performance: this.formatToPercentage(this.drilldownDetails[key].performance, 2),
          cpl: this.formatToCurrency(this.drilldownDetails[key].costPerLead, this.drilldownDetails[key].campaignCurrency, 2),
          cplTrend: (key === 'currentCycle' ? this.getMetricDisplayValue(this.campaignDetails.cplTrendValue) : this.getMetricDisplayValue(this.drilldownDetails[key].cplTrend)),
          utilization: this.formatToPercentage(this.drilldownDetails[key].utilization, 2),
          costPerClick: this.formatToCurrency(this.drilldownDetails[key].costPerClick, this.drilldownDetails[key].campaignCurrency, 2),
          costPerCall: this.formatToCurrency(this.drilldownDetails[key].costPerCall, this.drilldownDetails[key].campaignCurrency, 2),
          ctr: this.formatToPercentage(this.drilldownDetails[key].ctr, 2),
          avgQs: this.formatToNumber(this.drilldownDetails[key].averageQualityScore, 2),
          clickPerLead: this.formatToNumber(this.drilldownDetails[key].clicksPerLead, 2),
          budgetScore: '-',
          alerts: '',
          lastClientCall: '',
          reviewed: '',
          // Arrow indicator for individual metrics
          sentimentIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].sentimentComp, colorScheme),
          performanceIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].performanceComp, colorScheme),
          costPerLeadIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].costPerLeadComp, colorScheme),
          utilizationScoreIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].utilizationScoreComp, colorScheme),
          costPerClickIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].costPerClickComp, colorScheme),
          costPerCallIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].costPerCallComp, colorScheme),
          ctrIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].ctrComp, colorScheme),
          qualityScoreIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].qualityScoreComp, colorScheme),
          clickPerLeadIndicator: this.getPerformanceIndicator(drilldownItemSequence[key].index, this.drilldownDetails[key].clicksPerLeadComp, colorScheme)
        };
      }
    }

    return this.drilldownViewItemList;
  }

  getPerformanceIndicator(subItemRowIndex, metricItem, colorScheme) {
    let arrowClass, colorClass, performanceIndicator = '';

    if (metricItem !== null && typeof metricItem !== 'undefined' && metricItem !== '' && subItemRowIndex === 0){
      switch (metricItem.arrow) {
        case -1:
          arrowClass = 'fa-long-arrow-down';
          break;
        case 0:
          arrowClass = 'fa-long-arrow-right';
          break;
        case 1:
          arrowClass = 'fa-long-arrow-up';
          break;
        default:
          arrowClass = 'fa-long-arrow-right';
      }

      switch (metricItem.color) {
        case 1:
          colorClass = 'red-indicator';
          break;
        case 2:
          colorClass = 'yellow-indicator';
          break;
        case 3:
          colorClass = 'green-indicator';
          break;
        default:
          colorClass = 'grey-indicator';
      }

      performanceIndicator = '<span class="'+colorClass+'"><i class="fa fa-lg '+arrowClass+' '+colorScheme+'" aria-hidden="true"></i></span>';
    }

    return performanceIndicator;
  }

  formatToCurrency(value, currency, decimal) {
    let displayValue = 'N/A';

    if (value || value == 0) {
      displayValue = this.$filter('isoCurrency')(value, currency, decimal);
    }

    return displayValue;
  }

  formatToNumber(value, decimal) {
    let displayValue = 'N/A';

    if (value || value == 0) {
      displayValue = this.$filter('number')(value, decimal);
    }

    return displayValue;
  }

  formatToPercentage(value, decimal) {
    let displayValue = 'N/A';

    if (value || value == 0) {
      displayValue = this.$filter('flexnumber')(value, 'percent', decimal);
    }

    return displayValue;
  }

  getMetricDisplayValue(value) {
    let displayValue = 'N/A';

    if (value || value == 0) {
      displayValue = value;
    }

    return displayValue;
  }

}

export default angular
  .module('home.dashboard-drilldown.service', [])
  .service('DrillDownService', DrillDownService)
  .name;
