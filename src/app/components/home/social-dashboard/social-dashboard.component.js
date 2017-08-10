import template from './social-dashboard.html';
const me = 'SocialDashboard';

class Controller {

  constructor(rlApi, SocialDashboardService, $q, rlConfig, rlLogger, MultiFilterSettings) {
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
    this.filterSettings = MultiFilterSettings;
  }

  $onInit() {
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
    this.Logger.trace('channelSelected', {channel: channel}, me);
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
}

export default {
  template: template,
  controller: Controller
};
