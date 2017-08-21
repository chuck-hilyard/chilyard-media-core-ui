import template from './social-dashboard.html';
const me = 'SocialDashboard';

class Controller {

  constructor(SocialDashboardService, $q, rlConfig, rlLogger) {
    'ngInject';
    this.dropdown_values = [];
    this.Logger = rlLogger;
    this.socialService = SocialDashboardService;
    this.channel_values = {};
    this.fbSpecialist_values = {};
    this.offer_values = {};
    this.dmc_values = {};
    this.featureFlags = rlConfig.featureFlags;
    this.$q = $q;
  }

  $onInit() {
    this.setInitialValues();
    this.loadDropdownValues();
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

}

export default {
  template: template,
  controller: Controller
};
