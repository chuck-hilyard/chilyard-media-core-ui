import template from './search-dashboard.html';

const me = 'SearchDashboard';

class Controller {

  constructor($filter, $q, rlLogger, DrillDownService, SearchDashboardService, MultiFilterSettingsService) {
    'ngInject';
    this.colorScheme = 'scheme1';
    this.filteredData = [];
    this.drilldownIconStatus = [];
    this.drilldownViewItemList = [];
    this.grayoutDashboard = false;
    this.$filter = $filter;
    this.$q = $q;
    this.Logger = rlLogger;
    this.DrillDownService = DrillDownService;
    this.SearchDashboardService = SearchDashboardService;
    this.filterService = MultiFilterSettingsService;
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

    this.filterSettings = this.filterService.build();

    this.setInitialValues();
    this.loadCPValues();
    this.getCampaignList();
  }

  setInitialValues() {
    this.platform_values = {
      options: {
        showFields: [{field: 'platformName'}],
        list: [],
        placeholder: 'USA',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    };
    this.cp_values = {
      options: {
        showFields: [{field: 'CP'}],
        list: [],
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    };
    this.dmc_values = {
      options: {
        showFields: [{field: 'businessName'}],
        list: [],
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    };
  }

  loadCPValues() {
    this.SearchDashboardService.getCPList('USA')
      .then((response) => {
        this.cp_values.options = {
          showFields: [{field: 'campaignPerformerName'}],
          list: response,
          placeholder: 'All',
          customClass: 'left-bordered-dropdown'
        };
        this.cp_values.disabled = false;
      })
      .catch((error) => {
        this.Logger.error('Error in loading channel or facebook list', {error: error}, me);
      })
      .finally(() => {
      });
  }

  CPSelected(campaignProfessional) {
    this.campaignProfessional = campaignProfessional;
    this.SearchDashboardService.getDMCList('USA', this.campaignProfessional.businessUserId).then((response) => {
      this.dmc_values.options = {
        showFields: [{field: 'campaignPerformerName'}],
        list: response,
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      };
      this.dmc_values.disabled = false;
    })
    .catch((error) => {
      this.Logger.error('Error in loading offers', {error: error}, me);
    })
    .finally(() => {
    });
  }

  updateSettings(settings) {
    this.filterSettings = settings;
  }

  applyFilters() {
    this.selectedAdditional = this.filterService.parseAdditional(this.filterSettings);
    let filters = [
      {func: this.$filter('multiFilter'), args: [this.filterSettings, 'campaignId']},
      {func: this.$filter('orderBy'), args: (this.sort.reverse ? '-' : '') + this.sort.key},
      {func: this.$filter('sortNulls'), args: this.sort.key}
    ];
    filters.forEach((filter) => {
      this.filteredData = filter.func.apply(filter.func, [this.filteredData, filter.args]);
    });
  }

  changeDashboardTheme(newTheme) {
    this.colorScheme = newTheme;
  }

  getCampaignList() {
    this.SearchDashboardService.getCampaignList()
      .then((success) => {
        this.filteredData = success;
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
    this.SearchDashboardService.getCampaignDrilldown()
      .then((success) => {
        this.drilldownViewItemList = this.DrillDownService.userDashboardDrilldownViewCtrl(
          campaignObj,
          success,
          this.colorScheme
        );
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
