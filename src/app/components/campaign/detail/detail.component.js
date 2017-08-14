import template from './detail.html';


class Controller {

  constructor(CampaignDetailService) {
    'ngInject';
    // services
    this.service = CampaignDetailService;

    let moduleSettings = {
      ageGender: false,
      device: false,
      performance: false
    };

    // Local Vars
    this.ageGenderData = null;
    this.campaign = null;
    this.dataSettings = null;
    this.deviceData = null;
    this.loading = angular.copy(moduleSettings);
    this.performanceData = null;
    this.supported = angular.copy(moduleSettings);
  }

  $onChanges(changes) {
    let reload = false;
    if (changes.campaignOverview) {
      this.campaign = angular.copy(changes.campaignOverview.currentValue);
      this.setSupported();
      reload = true;
    }
    if (changes.currentDataSettings) {
      this.dataSettings = angular.copy(changes.currentDataSettings.currentValue);
      reload = true;
    }
    if (reload) {
      this.getData();
    }
  }

  getData() {
    let mcid = this.campaign.masterCampaignId;
    let breakdown = this.dataSettings.breakdown;
    let params = this.dataSettings.apiParams;
    this.getPerformanceData(mcid, breakdown, params);
    this.getAgeGenderData(mcid, breakdown, params);
    this.getDeviceData(mcid, breakdown, params);
  }

  getAgeGenderData(mcid, breakdown, params) {
    if (!this.supported.ageGender) {
      return;
    }
    this.loading.ageGender = true;
    this.service.getAgeGenderData(mcid, breakdown, params)
      .then((response) => {
        this.ageGenderData = response.data;
        this.loading.ageGender = false;
      })
      .catch(() => {
        this.ageGenderData = new Error();
        this.loading.ageGender = false;
      });
  }

  getDeviceData(mcid, breakdown, params) {
    if (!this.supported.device) {
      return;
    }
    this.loading.device = true;
    this.service.getDeviceData(mcid, breakdown, params)
      .then((response) => {
        this.deviceData = response.data;
        this.loading.device = false;
      })
      .catch(() => {
        this.deviceData = new Error();
        this.loading.device = false;
      });
  }

  getPerformanceData(mcid, breakdown, params) {
    if (!this.supported.performance) {
      return;
    }
    this.loading.performance = true;
    this.service.getPerformanceData(mcid, breakdown, params)
      .then((response) => {
        this.performanceData = response.data;
        this.loading.performance = false;
      })
      .catch(() => {
        this.performanceData = new Error();
        this.loading.performance = false;
      });
  }

  enableModules(modules) {
    modules.forEach((module) => {
      this.supported[module] = true;
    });
  }

  setSupported() {
    this.campaign.webPublisherCampaigns.forEach((wpc) => {
      if (wpc.publisherCampaignType === 'SOCIAL') {
        this.enableModules(['ageGender', 'device', 'performance']);
      }
      if (wpc.publisherCampaignType === 'SEARCH') {
        this.enableModules(['device', 'performance']);
      }
    });
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignOverview: '<',
    currentDataSettings: '<'
  }
};
