import template from './performance.html';
import columnsConfig from './configs/columns';
const me = 'Performance Controller';

class Controller {

  constructor($filter, $sce, $scope, rlLogger, CampaignSidebar) {
    'ngInject';
    this.$filter = $filter;
    this.$sce = $sce;
    this.Logger = rlLogger;

    this.breakdownLabel = '';
    this.columns = [];
    this.columnsConfig = columnsConfig;
    this.delegate = {};
    this.init = false;
    this.sortState = {};

    // Tooltip templates
    this.tooltips = {
      utilization: this.tooltipHtml('campaignDetails.utilizationTitle'),
      impressions: this.tooltipHtml('campaignDetails.impressionsTitle', 'campaignDetails.impressionsMessage'),
      cpm: this.tooltipHtml('campaignDetails.cpmTitle', 'campaignDetails.cpmMessage'),
      ctr: this.tooltipHtml('campaignDetails.ctrTitle', 'campaignDetails.ctrMessage'),
      allClicks: this.tooltipHtml('campaignDetails.allClicksTitle', 'campaignDetails.allClicksMessage'),
      frequency: this.tooltipHtml('campaignDetails.frequencyTitle', 'campaignDetails.frequencyMessage'),
      reach: this.tooltipHtml('campaignDetails.reachTitle', 'campaignDetails.reachMessage'),
      socialReach: this.tooltipHtml('campaignDetails.socialReachTitle', 'campaignDetails.socialReachMessage'),
      socialImpressions: this.tooltipHtml('campaignDetails.socialImpressionsTitle', 'campaignDetails.socialImpressionsMessage'),
      websiteClicks: this.tooltipHtml('campaignDetails.websiteClicksTitle', 'campaignDetails.websiteClicksMessage'),
      buttonClicks: this.tooltipHtml('campaignDetails.buttonClicksTitle', 'campaignDetails.buttonClicksMessage'),
      linkClicks: this.tooltipHtml('campaignDetails.linkClicksTitle', 'campaignDetails.linkClicksMessage'),
      socialClicks: this.tooltipHtml('campaignDetails.socialClicksTitle', 'campaignDetails.socialClicksMessage'),
      leadForms: this.tooltipHtml('campaignDetails.leadFormsTitle', 'campaignDetails.leadFormsMessage'),
      checkIns: this.tooltipHtml('campaignDetails.checkInsTitle', 'campaignDetails.checkInsMessage'),
      postComments: this.tooltipHtml('campaignDetails.postCommentsTitle', 'campaignDetails.postCommentsMessage'),
      postReactions: this.tooltipHtml('campaignDetails.postReactionsTitle', 'campaignDetails.postReactionsMessage'),
      postShares: this.tooltipHtml('campaignDetails.postSharesTitle', 'campaignDetails.postSharesMessage'),
      postEngagements: this.tooltipHtml('campaignDetails.postEngagementTitle', 'campaignDetails.postEngagementMessage'),
      pageLikes: this.tooltipHtml('campaignDetails.pageLikesTitle', 'campaignDetails.pageLikesMessage'),
      pageEngagement: this.tooltipHtml('campaignDetails.pageEngagementTitle', 'campaignDetails.pageEngagementMessage')
    };

    $scope.$watch(() => CampaignSidebar.collapsed, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.delegate.resize();
      }
    });
  }

  $onInit() {
    this.setLabel(this.breakdownType);
  }

  $onChanges(changes) {
    let currentData = (changes.data) ? changes.data.currentValue : null;
    this.Logger.trace('$onChanges', {changes: changes, currentData: currentData}, me);
    if (currentData && currentData.data && !this.isError(currentData)) {
      this.sortState = {};
      this.configureTable(currentData.data);
    }
    if (changes.breakdownType) {
      this.setLabel(changes.breakdownType.currentValue);
    }
  }

  configureTable(dataObj) {
    let data = dataObj;
    this.Logger.trace('configureTable', {dataObj: dataObj, breakdownType: this.breakdownType, breakdownLabel: this.breakdownLabel}, me);
    this.columns = [];
    let keys = Object.keys(data[0]);
    let label = this.columnsConfig.find((item) => item.key === 'tableLabel');
    switch (this.breakdownType) {
      case 'cycles':
        label.label = 'Cycles';
        break;
      case 'months':
        label.label = 'Months';
        break;
      case 'days':
        label.label = 'Days';
        break;
      default:
        label.label = 'Label';
    }
    angular.forEach(this.columnsConfig, (value) => {
      if (keys.indexOf(value.key) > -1) {
        this.columns.push(angular.copy(value));
      }
    });
    if (this.init) {
      this.delegate.rebuild();
    }
    this.init = true;
  }

  handleSort(state) {
    this.Logger.info('handleSort', state, me);
    this.sortState = state;
    if (this.breakdownType === 'cycles') {
      this.sortState.key = 'cycleNumber';
    }
    this.data = this.$filter('orderBy')(this.data, `-${this.sortState.key}`, this.sortState.desc);
  }

  handleNextPage() {
    angular.noop();
  }

  isError(data) {
    let object = data || this.data;
    return object instanceof Error;
  }

  setLabel(type) {
    switch (type) {
      case 'cycles':
        this.breakdownLabel = 'campaignDetails.cycles';
        break;
      case 'months':
        this.breakdownLabel = 'campaignDetails.monthly';
        break;
      case 'days':
        this.breakdownLabel = 'campaignDetails.daily';
        break;
    }
  }

  tooltipHtml(titleKey, messageKey) {
    let output = `<b>${this.$filter('translate')(titleKey)}</b>`;
    if (messageKey) {
      output += `<hr>${this.$filter('translate')(messageKey)}`;
    }
    return this.$sce.trustAsHtml(output);
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    data: '<',
    breakdownType: '<',
    loading: '<'
  }
};
