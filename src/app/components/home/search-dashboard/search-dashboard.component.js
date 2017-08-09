import template from './search-dashboard.html';

class Controller {

  constructor() {
    'ngInject';
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
  }

  changeDashboardTheme(newTheme) {
    return newTheme; // return the variable because the campaign listing is not done
    // TODO: implement the theme change logic when the campaign listing table is done
  }

}

export default {
  template: template,
  controller: Controller
};
