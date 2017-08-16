class DashboardMetricHoverService {

  constructor($filter) {
    'ngInject';
    this.$filter = $filter;
  }

  computeUserDashboardMetricItemList(metricKey, campaignDetails) {
    let metricItemList;

    switch (metricKey) {
      case 'sentiment':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Client Sentiment Score:', value: this.getMetricDisplayValue(campaignDetails.sentimentValue)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'performance':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'CPL Trend:', value: this.getMetricDisplayValue(campaignDetails.cplTrendValue)},
          {title: 'Utilization:', value: this.formatToPercentage(campaignDetails.utilization, 2)},
          {title: 'CPL to Goal:', value: this.formatToPercentage(campaignDetails.cplToGoal, 2)},
          {title: 'CPL Goal:', value: this.formatToCurrency(campaignDetails.cplGoal, campaignDetails.campaignCurrency, 2)},
          {title: 'Historical CPL:', value: this.formatToCurrency(campaignDetails.cplHist, campaignDetails.campaignCurrency, 2)},
          {title: 'BSC Median CPL:', value: this.formatToCurrency(campaignDetails.cpleadMedian, campaignDetails.campaignCurrency, 2)},
          {title: 'Avg. Quality Score:', value: this.formatToNumber(campaignDetails.averageQualityScore, 2)},
          {title: 'Performance Score:', value: this.formatToPercentage(campaignDetails.performance, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'cpl':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'CPL:', value: this.formatToCurrency(campaignDetails.costPerLead, campaignDetails.campaignCurrency, 2)},
          {title: 'CPL to Goal:', value: this.formatToPercentage(campaignDetails.cplToGoal, 2)},
          {title: 'CPL Goal:', value: this.formatToCurrency(campaignDetails.cplGoal, campaignDetails.campaignCurrency, 2)},
          {title: 'Historical CPL:', value: this.formatToCurrency(campaignDetails.cplHist, campaignDetails.campaignCurrency, 2)},
          {title: 'BSC Median CPL:', value: this.formatToCurrency(campaignDetails.cpleadMedian, campaignDetails.campaignCurrency, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'cplTrend':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'CPL Trend:', value: this.getMetricDisplayValue(campaignDetails.cplTrendValue)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'utilization':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Utilization:', value: this.formatToPercentage(campaignDetails.utilization, 2)},
          {title: 'Spend Rate:', value: this.getMetricDisplayValue(campaignDetails.spendRate)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'costPerClick':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Cost Per Click:', value: this.formatToCurrency(campaignDetails.costPerClick, campaignDetails.campaignCurrency, 2)},
          {title: 'BSC Median Cost Per Click:', value: this.formatToCurrency(campaignDetails.cpclickMedian, campaignDetails.campaignCurrency, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'costPerCall':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Cost Per Call:', value: this.formatToCurrency(campaignDetails.costPerCall, campaignDetails.campaignCurrency, 2)},
          {title: 'BSC Median Cost Per Call:', value: this.formatToCurrency(campaignDetails.cpcallMedian, campaignDetails.campaignCurrency, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'ctr':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'CTR:', value: this.formatToPercentage(campaignDetails.ctr, 2)},
          {title: 'BSC Median CTR:', value: this.formatToPercentage(campaignDetails.ctrMedian, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'avgQs':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Avg. QS:', value: this.formatToNumber(campaignDetails.averageQualityScore, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'clickPerLead':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Click Per Lead:', value: this.getMetricDisplayValue(campaignDetails.clicksPerLead)},
          {title: 'BSC Median Click Per Lead:', value: this.getMetricDisplayValue(campaignDetails.clicksPerLeadMedian)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'budgetScore':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'BSC Median Budget:', value: this.formatToCurrency(campaignDetails.budgetMedian, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'alert':
        if (campaignDetails.alert === 1) {
          metricItemList = [
            {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
            {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
            {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
            {title: 'Alert:', value: 'High Risk'},
            {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
            {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
          ];
        }
        else {
          metricItemList = [];
        }
        break;
      case 'lastClientCall':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Last Client Call:', value: this.getMetricDisplayValue(campaignDetails.lastClientCallActivity)},
          {title: 'Frequency:', value: this.getMetricDisplayValue(campaignDetails.requestedCommunicationFrequency)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'reviewed':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessID)},
          {title: 'Reviewed On:', value: this.getMetricDisplayValue(campaignDetails.campaignsReviews.created)},
          {title: 'Reviewer:', value: this.getMetricDisplayValue(campaignDetails.campaignsReviews.businessUserName)},
          {title: 'Reviewer Email-Id:', value: this.getMetricDisplayValue(campaignDetails.campaignsReviews.businessUserEmail)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      default:
        metricItemList = [];
    }

    return metricItemList;
  }

  computeFacebookDashboardMetricItemList(metricKey, campaignDetails) {
    let metricItemList;

    switch (metricKey) {
      case 'sentiment':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Client Sentiment Score:', value: this.getMetricDisplayValue(campaignDetails.sentimentValue)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'performance':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Performance Score:', value: this.formatToNumber(campaignDetails.performance, 2) + ' of 3 (' + this.formatToPercentage(campaignDetails.performancePercentage, 2) + ')'},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'cpm':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'CPM:', value: this.formatToCurrency(campaignDetails.cpm, campaignDetails.campaignCurrency, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'ctr':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'CTR:', value: this.formatToPercentage(campaignDetails.ctr, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'utilization':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Utilization:', value: this.formatToPercentage(campaignDetails.utilization, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'cpmTrend':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'CPM Trend:', value: this.getMetricDisplayValue(campaignDetails.cpmTrendValue)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'ctrTrend':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'CTR Trend:', value: this.getMetricDisplayValue(campaignDetails.ctrTrendValue)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'adChange':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Ad Change:', value: this.getMetricDisplayValue(campaignDetails.adChange)+' days ago'},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'relevance':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Relevance:', value: this.getMetricDisplayValue(campaignDetails.relevance)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'frequency':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Frequency:', value: this.getMetricDisplayValue(campaignDetails.frequency)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'cpc':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Cost Per Click:', value: this.formatToCurrency(campaignDetails.costPerClick, campaignDetails.campaignCurrency, 2)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'lastClientCall':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Last Client Call:', value: this.getMetricDisplayValue(campaignDetails.lastClientCallActivity)},
          {title: 'Frequency:', value: this.getMetricDisplayValue(campaignDetails.requestedCommunicationFrequency)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      case 'reviewed':
        metricItemList = [
          {title: 'Budget:', value: this.formatToCurrency(campaignDetails.campaignBudget, campaignDetails.campaignCurrency, 2)},
          {title: 'Business:', value: this.getMetricDisplayValue(campaignDetails.businessName)},
          {title: 'BID:', value: this.getMetricDisplayValue(campaignDetails.businessId)},
          {title: 'Reviewed On:', value: this.getMetricDisplayValue(campaignDetails.campaignsReviews.created)},
          {title: 'Reviewer:', value: this.getMetricDisplayValue(campaignDetails.campaignsReviews.businessUserName)},
          {title: 'Reviewer Email-Id:', value: this.getMetricDisplayValue(campaignDetails.campaignsReviews.businessUserEmail)},
          {title: 'Category:', value: this.getMetricDisplayValue(campaignDetails.businessCategoryName)},
          {title: 'SubCategory:', value: this.getMetricDisplayValue(campaignDetails.businessSubCategoryName)}
        ];
        break;
      default:
        metricItemList = [];
    }

    return metricItemList;
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
  .module('common.dashboard-metric-hover.service', [])
  .service('DashboardMetricHoverService', DashboardMetricHoverService)
  .name;
