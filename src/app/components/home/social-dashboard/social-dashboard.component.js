import template from './social-dashboard.html';

class Controller {

  constructor($log, SocialDashboardService, $q) {
    'ngInject';
    this.dropdown_values = [];
    this.$log = $log;
    this.socialService = SocialDashboardService;
    this.channel_values = {};
    this.fbSpecialist_values = {};
    this.offer_values = {};
    this.dmc_values = {};
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
    ]).then((data) => {
      let channelResponse = data[0];
      let fbSpecialistResponse = data[1];

      let placeholder = {'channelId': -1, 'channelName': 'All'};
      channelResponse.data.splice(0, 0, placeholder);
      this.channel_values = {
        showFields: [{field: 'channelName'}],
        list: channelResponse.data,
        selected: placeholder
      };

      placeholder = {'businessEmail': '', 'businessId': -1, 'facebookSpecialistName': 'SelectFB'};
      fbSpecialistResponse.splice(0, 0, placeholder);
      this.fbSpecialist_values = {
        showFields: [{field: 'facebookSpecialistName'}],
        list: fbSpecialistResponse,
        selected: placeholder
      };
    });
  }

  platformSelected(platform) {
    this.$log.log(platform, 'platform');
  }

  fbSpecialistSelected(fbSpecialist) {
    this.fbSpecialist = fbSpecialist;
    this.socialService.getFacebookOfferList('USA', this.fbSpecialist.businessUserId).then((response) => {
      let placeholder = {'offerId': -1, 'offerName': 'All'};
      response.splice(0, 0, placeholder);
      this.offer_values = {
        showFields: [{field: 'offerName'}],
        list: response,
        selected: placeholder
      };
    });
  }

  channelSelected(channel) {
    this.$log.log(channel, 'channel');
  }

  offerSelected(offer) {
    this.offer = offer;
    this.socialService.getFacebookSpecialistDmcList('USA', this.fbSpecialist.businessUserId, this.offer.offerId).then((response) => {
      let placeholder = {'businessId': -1, 'businessName': 'All'};
      response.splice(0, 0, placeholder);
      this.dmc_values = {
        showFields: [{field: 'businessName'}],
        list: response,
        selected: placeholder
      };
    });
  }

  dmcSelected(dmc) {
    this.$log.log(dmc, 'dmc');
  }

  setInitialValues() {
    let placeholder = {'platformId': 1, 'platformName': 'USA'};
    this.platform_values = {
      showFields: [{field: 'platformName'}],
      list: [placeholder],
      selected: placeholder,
      disabled: true
    };
    placeholder = {'channelId': -1, 'channelName': 'All'};
    this.channel_values = {
      showFields: [{field: 'channelName'}],
      list: [placeholder],
      selected: placeholder,
      disabled: true
    };
    placeholder = {'businessEmail': '', 'businessId': -1, 'facebookSpecialistName': 'SelectFB'};
    this.fbSpecialist_values = {
      showFields: [{field: 'facebookSpecialistName'}],
      list: [placeholder],
      selected: placeholder,
      disabled: true
    };
    placeholder = {'offerId': -1, 'offerName': 'All'};
    this.offer_values = {
      showFields: [{field: 'offerName'}],
      list: [placeholder],
      selected: placeholder,
      disabled: true
    };
    placeholder = {'businessId': -1, 'businessName': 'All'};
    this.dmc_values = {
      showFields: [{field: 'businessName'}],
      list: [placeholder],
      selected: placeholder,
      disabled: true
    };
  }

}

export default {
  template: template,
  controller: Controller
};
