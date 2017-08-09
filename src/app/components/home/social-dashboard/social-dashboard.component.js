import template from './social-dashboard.html';

class Controller {

  constructor($log, SocialDashboardService) {
    'ngInject';
    this.dropdown_values = [];
    this.$log = $log;
    this.socialService = SocialDashboardService;
    this.channel_values = {};
    this.fbSpecialist_values = {};
    this.offer_values = {};
    this.dmc_values = {};
  }

  $onInit() {
    this.setInitialValues();
    this.checkLogin();
  }

  checkLogin() {
    this.socialService.checkLogin().then(() => {
      this.socialService.getChannelList('USA').then((response) => {
        let placeholder = {'channelId': -1, 'channelName': 'All'};
        response.data.splice(0, 0, placeholder);
        this.channel_values = {
          showFields: [{field: 'channelName'}],
          list: response.data,
          selected: placeholder
        };
      });
      this.socialService.getFacebookSpecialistList('USA').then((response) => {
        let placeholder = {'businessEmail': '', 'businessId': -1, 'facebookSpecialistName': 'SelectFB'};
        response.splice(0, 0, placeholder);
        this.fbSpecialist_values = {
          showFields: [{field: 'facebookSpecialistName'}],
          list: response,
          selected: placeholder
        };
      });
    }, () => {
    });
  }

  platformSelected(platform) {
    this.$log.log(platform, 'platform');
  }

  fbSpecialistSelected(fbSpecialist) {
    this.fbSpecialist = fbSpecialist;
    this.socialService.getFacebookOfferList('USA', fbSpecialist.businessUserId).then((response) => {
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
    this.socialService.getFacebookSpecialistDmcList('USA', this.fbSpecialist.businessUserId, offer.offerId).then((response) => {
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
      selected: placeholder
    };
    placeholder = {'channelId': -1, 'channelName': 'All'};
    this.channel_values = {
      showFields: [{field: 'channelName'}],
      list: [placeholder],
      selected: placeholder
    };
    placeholder = {'businessEmail': '', 'businessId': -1, 'facebookSpecialistName': 'SelectFB'};
    this.fbSpecialist_values = {
      showFields: [{field: 'facebookSpecialistName'}],
      list: [placeholder],
      selected: placeholder
    };
    placeholder = {'offerId': -1, 'offerName': 'All'};
    this.offer_values = {
      showFields: [{field: 'offerName'}],
      list: [placeholder],
      selected: placeholder
    };
    placeholder = {'businessId': -1, 'businessName': 'All'};
    this.dmc_values = {
      showFields: [{field: 'businessName'}],
      list: [placeholder],
      selected: placeholder
    };
  }

}

export default {
  template: template,
  controller: Controller
};
