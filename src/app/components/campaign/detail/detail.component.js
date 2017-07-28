import template from './detail.html';
const me = 'Campaign Detail Controller';

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
      .catch((error) => {
        this.ageGenderData = new Error('unable to load the age/gender data at this time');
        this.loading.ageGender = false;
        this.Logger.error('Error getting Age/Gender data', {
          error: error
        }, me);
      });
  }

  getDeviceData(mcid, breakdown, params) {
    this.loading.device = true;
    this.service.getDeviceData(mcid, breakdown, params)
      .then((response) => {
        this.deviceData = response.data;
        this.loading.device = false;
      })
      .catch((error) => {
        this.deviceData = new Error('unable to load device data at this time');
        this.loading.device = false;
        this.Logger.error('Error getting the device data', {
          error: error
        }, me);
      });
  }

  getPerformanceData(mcid, breakdown, params) {
    this.loading.performance = true;
    this.service.getPerformanceData(mcid, breakdown, params)
      .then((response) => {
        this.performanceData = response.data;
        this.loading.performance = false;
      })
      .catch((error) => {
        this.performanceData = new Error('unable to load trend/performance data at this time');
        this.loading.performance = false;
        this.Logger.error('Error getting the trend/performance data', {
          error: error
        }, me);
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
