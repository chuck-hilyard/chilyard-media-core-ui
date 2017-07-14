import template from './detail.html';

class Controller {

  constructor($log, CampaignDetailService) {
    'ngInject';
    // angular
    this.$log = $log;

    // Local Vars
    this.ageGenderData = null;
    this.deviceData = null;
    this.performanceData = null;
    this.service = CampaignDetailService;
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
    this.service.getAgeGenderData(mcid, breakdown, params)
      .then((response) => {
        this.ageGenderData = response.data;
      })
      .catch((error) => {
        this.ageGenderData = new Error('unable to load the age/gender data at this time');
        this.$log.error('Error getting Age/Gender data', {
          error: error
        });
      });
  }

  getDeviceData(mcid, breakdown, params) {
    this.service.getDeviceData(mcid, breakdown, params)
      .then((response) => {
        this.deviceData = response.data;
      })
      .catch((error) => {
        this.deviceData = new Error('unable to load device data at this time');
        this.$log.error('Error getting the device data', {
          error: error
        });
      });
  }

  getPerformanceData(mcid, breakdown, params) {
    this.service.getPerformanceData(mcid, breakdown, params)
      .then((response) => {
        this.performanceData = response.data;
      })
      .catch((error) => {
        this.performanceData = new Error('unable to load trend/performance data at this time');
        this.$log.error('Error getting the trend/performance data', {
          error: error
        });
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
