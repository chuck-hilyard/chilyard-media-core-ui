import template from './search-dashboard.html';

class Controller {

  constructor(rlApi, DrillDownService) {
    'ngInject';
    this.colorScheme = 'scheme1';
    this.filteredData = [];
    this.campaignDrilldown;
    this.drilldownIconStatus = [];
    this.drilldownViewItemList = [];
    this.grayoutDashboard = false;
    this.DrillDownService = DrillDownService;
    this.api = rlApi;
  }

  $onInit() {
    this.dynamicPopover = {
      cidTemplateUrl: 'templates/cid.template.html',
      priorityTemplateUrl: 'templates/priority.template.html',
      budgetAmountTemplateUrl: 'templates/budget-amount.template.html',
      clientSentimentTemplateUrl: 'templates/client-sentiment.template.html',
      performanceTemplateUrl: 'templates/performance.template.html',
      cplTemplateUrl: 'templates/cpl.template.html',
      cplTrendTemplateUrl: 'templates/cpl-trend.template.html',
      utilizationTemplateUrl: 'templates/utilization.template.html',
      costPerClickTemplateUrl: 'templates/cost-click.template.html',
      costPerCallTemplateUrl: 'templates/cost-call.template.html',
      ctrTemplateUrl: 'templates/ctr.template.html',
      avgQSTemplateUrl: 'templates/avg-qs.template.html',
      clickPerLeadTemplateUrl: 'templates/click-lead.template.html',
      budgetScoreTemplateUrl: 'templates/budget-score.template.html',
      alertsTemplateUrl: 'templates/alerts.template.html',
      clientCallTemplateUrl: 'templates/clientcall.template.html',
      reviewedTemplateUrl: 'templates/reviewed.template.html'
    };

    this.getCampaignList();
  }

  changeDashboardTheme(newTheme) {
    this.colorScheme = newTheme;
  }

  getCampaignList() {
    return this.api.mediaGatewayGet('/campaigns/')
      .then((success) => {
        this.filteredData = success.data;
      })
      .catch((error) => {
        return new Error(error);
      });
  }

  getIndicator(value) {
    let colorClass;

    switch (value) {
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

    return colorClass;
  }

  getFlagIndicator(value) {
    return (value ? 'red-indicator' : 'green-indicator');
  }

  openDrillDownView(campaignObj) {
    this.drilldownIconStatus[campaignObj.campaignId] = 1;
    this.grayoutDashboard = true;
    this.api.mediaGatewayGet('/campaign/drilldown/')
      .then((success) => {
        this.drilldownViewItemList = this.DrillDownService.userDashboardDrilldownViewCtrl(
          campaignObj,
          success.data,
          this.colorScheme
        );
      })
      .catch((error) => {
        return new Error(error);
      });
  }

  closeDrillDownView(campaignId) {
    this.drilldownIconStatus[campaignId] = 0;
    this.grayoutDashboard = false;
  }

}

export default {
  template: template,
  controller: Controller
};
