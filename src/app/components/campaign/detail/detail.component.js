import template from './detail.html';


class Controller {

  constructor(rlLogger, CampaignDetailService) {
    'ngInject';
    // services
    this.Logger = rlLogger;
    this.service = CampaignDetailService;

    // Local Vars
    this.ageGenderData = null;
    this.deviceData = null;
    this.loading = {
      ageGender: false,
      device: false,
      performance: false
    };
    this.performanceData = null;
  }

  $onChanges(changes) {
    let reload = false;
    if (changes.campaignOverview) {
      this.campaign = this.campaignOverview;
      reload = true;
    }
    if (changes.currentDataSettings) {
      this.dataSettings = this.currentDataSettings;
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
}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignOverview: '<',
    currentDataSettings: '<'
  }
};
