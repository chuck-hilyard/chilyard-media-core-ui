import template from './dashboard-metric-hover.html';

class Controller {

  constructor(DashboardMetricHoverService) {
    'ngInject';
    this.metricItemList = [];
    this.metricPopupClass = 'up-arrow-left';
    this.service = DashboardMetricHoverService;
  }

  $onInit() {
    this.metricItemList = this.populateMetricItemList();

    if (this.popupPosition === 'left' || this.popupPosition === 'left-checkbox') {
      this.metricPopupClass = 'up-arrow-right';
    }
  }

  $onChanges() {
    this.populateMetricItemList();
  }

  populateMetricItemList() {
    if (this.dashboardType === 'userdashboard') {
      return this.service.computeUserDashboardMetricItemList(this.metricKey, this.campaignDetails);
    }
    else if (this.dashboardType === 'facebookdashboard') {
      return this.service.computeFacebookDashboardMetricItemList(this.metricKey, this.campaignDetails);
    }
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    dashboardType: '@',
    metricKey: '@',
    popupPosition: '@',
    campaignDetails: '<'
  }
};
