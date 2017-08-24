import template from './social-dashboard.html';
const me = 'SocialDashboard';

class Controller {

  constructor(rlApi, SocialDashboardService, $q, rlConfig, rlLogger, MultiFilterSettingsService, $filter) {
    'ngInject';
    this.api = rlApi;
    this.dropdown_values = [];
    this.Logger = rlLogger;
    this.socialService = SocialDashboardService;
    this.channel_values = {};
    this.fbSpecialist_values = {};
    this.offer_values = {};
    this.dmc_values = {};
    this.featureFlags = rlConfig.featureFlags;
    this.$q = $q;
    this.filteredData = [];
    this.colorScheme = 'scheme1';
    this.filterService = MultiFilterSettingsService;
    this.advertiser_list = [];
    this.$filter = $filter;
  }

  $onInit() {
    this.filteredData = [];
    this.filterSettings = this.filterService.build();
    this.additionalFilters();
    this.selectedAdditional = this.filterService.parseAdditional(this.filterSettings);
    this.setInitialValues();
    this.loadDropdownValues();
    this.dynamicPopover = {
      cidTemplateUrl: 'templates/cid.template.html',
      priorityTemplateUrl: 'templates/priority.template.html',
      budgetAmountTemplateUrl: 'templates/budget-amount.template.html',
      clientSentimentTemplateUrl: 'templates/client-sentiment.template.html',
      performanceTemplateUrl: 'templates/performance.template.html',
      cplTemplateUrl: 'templates/cpl.template.html',
      cplTrendTemplateUrl: 'templates/cpl-trend.template.html',
      utilizationTemplateUrl: 'templates/utilization.template.html',
      ctrTemplateUrl: 'templates/ctr.template.html',
      adChangeUrl: 'templates/ad-change,template.html',
      cpmTemplateUrl: 'templates/cpm.template.html',
      cpmTrendTemplateUrl: 'templates/cpm-trend.template.html',
      ctrTrendTemplateUrl: 'templates/ctr-trend.template.html',
      cpcTemplateUrl: 'templates/cpc.template.html',
      adChangeTemplateUrl: 'templates/ad-change.template.html',
      lastDaySpendTemplateUrl: 'templates/last-day-spend.template.html',
      frequencyTemplateUrl: 'templates/frequency.template.html',
      relevanceTemplateUrl: 'templates/relevance.template.html',
      clientCallTemplateUrl: 'templates/clientcall.template.html',
      reviewedTemplateUrl: 'templates/reviewed.template.html'
    };
    this.getCampaignList();
    this.sort = {};
  }

  loadDropdownValues() {
    this.$q.all([
      this.socialService.getChannelList('USA'),
      this.socialService.getFacebookSpecialistList('USA')
    ]).then((success) => {
      let channelResponse = success[0];
      let fbSpecialistResponse = success[1];

      this.channel_values.options = {
        showFields: [{field: 'channelName'}],
        list: channelResponse.data,
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      };
      this.channel_values.disabled = false;

      this.fbSpecialist_values.options = {
        showFields: [{field: 'facebookSpecialistName'}],
        list: fbSpecialistResponse,
        placeholder: 'SelectFB',
        customClass: 'left-bordered-dropdown'
      };
      this.fbSpecialist_values.disabled = false;
    })
    .catch((error) => {
      this.Logger.warning('Error in loading channel or facebook list', {error: error}, me);
    })
    .finally(() => {
    });
  }

  platformSelected(platform) {
    this.Logger.trace('platformSelected', {platform: platform}, me);
  }

  fbSpecialistSelected(fbSpecialist) {
    this.fbSpecialist = fbSpecialist;
    this.socialService.getFacebookOfferList('USA', this.fbSpecialist.businessUserId).then((response) => {
      this.offer_values.options = {
        showFields: [{field: 'offerName'}],
        list: response,
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      };
      this.offer_values.disabled = false;
    })
    .catch((error) => {
      this.Logger.warning('Error in loading offers', {error: error}, me);
    })
    .finally(() => {
    });
  }

  channelSelected(channel) {
    this.channel = channel;
  }

  offerSelected(offer) {
    this.offer = offer;
    this.socialService.getFacebookSpecialistDmcList('USA', this.fbSpecialist.businessUserId, this.offer.offerId).then((response) => {
      this.dmc_values.options = {
        showFields: [{field: 'businessName'}],
        list: response,
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      };
      this.dmc_values.disabled = false;
    })
    .catch((error) => {
      this.Logger.warning('Error in loading dmc list', {error: error}, me);
    })
    .finally(() => {
    });
  }

  dmcSelected(dmc) {
    this.Logger.trace('dmcSelected', {dmc: dmc}, me);
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
    this.channel_values = {
      options: {
        showFields: [{field: 'channelName'}],
        list: [],
        placeholder: 'All',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    };
    this.fbSpecialist_values = {
      options: {
        showFields: [{field: 'facebookSpecialistName'}],
        list: [],
        placeholder: 'SelectFB',
        customClass: 'left-bordered-dropdown'
      },
      disabled: true
    };
    this.offer_values = {
      options: {
        showFields: [{field: 'offerName'}],
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

  getCampaignList() {
    return this.api.mediaGatewayGet('/socialcampaigns')
      .then((success) => {
        this.table = success.data;
        this.filteredData = success.data;
      })
      .catch((error) => {
        return new Error(error);
      });
  }

  clearCampaignList() {
    this.filteredData = [];
  }

  changeDashboardTheme(newTheme) {
    this.colorScheme = newTheme;
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

  additionalFilters() {
    if (this.advertiser_list.length === 0) {
      this.advertiser_list = [{id: null, label: 'Select Advertiser'}];
    }

    this.filterSettings.additionalFilters = [
      {
        'type': 'campaignName',
        'label': 'Campaign Name',
        'settings': {
          'comparator': 'text',
          'input': 'text'
        },
        'options': []
      },
      {
        'type': 'advertiserId',
        'label': 'Advertiser',
        'settings': {
          'comparator': 'none',
          'input': 'select'
        },
        'options': this.advertiser_list
      }
    ];
  }

  updateSettings(settings) {
    this.filterSettings = settings;
  }

  applyFilters() {
    this.filteredData = this.table;
    this.selectedAdditional = this.filterService.parseAdditional(this.filterSettings);
    let filters = [
      {func: this.$filter('multiFilter'), args: [this.filterSettings, 'campaignId']},
      {func: this.$filter('orderBy'), args: (this.sort.reverse ? '-' : '') + this.sort.key},
      {func: this.$filter('sortNulls'), args: this.sort.key},
      {func: this.$filter('facebookAdvertiser'), args: [this.selectedAdditional]},
      {func: this.$filter('facebookChannel'), args: [this.channel]}
    ];
    filters.forEach((filter) => {
      this.filteredData = filter.func.apply(filter.func, [this.filteredData, filter.args]);
    });
  }

}

export default {
  template: template,
  controller: Controller
};
