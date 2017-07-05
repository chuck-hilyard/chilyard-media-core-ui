import template from './performance.html';
import columnsConfig from './configs/columns';


class Controller {

  constructor($filter, $sce, $scope, CampaignSidebar) {
    'ngInject';
    this.$filter = $filter;
    this.$sce = $sce;

    this.columns = [];
    this.columnsConfig = columnsConfig;
    this.delegate = {};
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

  $onChanges(changes) {
    let currentData = changes.data.currentValue;
    if(currentData) {
      this.configureTable(currentData);
    }
  }

  configureTable(data) {
    this.columns = [];
    this.data = data;
    let keys = Object.keys(data[0]);
    angular.forEach(keys, (value) => {
      let keyOptions = this.columnsConfig [value];
      let column = {
        key: value
      };
      if (keyOptions) {
        angular.extend(column, keyOptions);
      } else {
        column.label = value;
      }
      if (column.hide !== true) {
        this.columns.push(column);
      }
    });
  }

  handleSort(state) {
    this.sortState = state;
  }

  handleNextPage() {
    angular.noop();
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
    data: '<'
  }
};
