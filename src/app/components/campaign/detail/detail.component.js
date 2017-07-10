import template from './detail.html';

const apiDateFilter = 'yyyy-MM-dd';
class Controller {

  constructor($filter, $scope, CampaignDetailService, CampaignSidebar, DataSettingsService) {
    'ngInject';
    // Angular
    this.$filter = $filter;

    // Local Vars
    this.ageGenderData = null;
    this.performanceData = null;
    this.dataSettingsService = DataSettingsService;
    this.service = CampaignDetailService;

    $scope.$watch(() => DataSettingsService.selectedSettings, () => {
      $scope.$ctrl.updateData();
    }, false);
  }

  $onInit() {
    this.updateData(this.campaignOverview);
  }

  $onChanges(changes) {
    if (changes.campaignOverview) {
      this.updateData(changes.campaignOverview.currentValue);
    }
  }

  updateData(campaignOverview) {
    if (campaignOverview) {
      this.campaign = campaignOverview;
    }
    this.getPerformanceData();
    this.getAgeGenderData();
    this.getDeviceData();
  }

  getAgeGenderData() {
    let breakdown = this.dataSettingsService.getSelectedBreakdownType();
    let params = this.dataSettingsService.getSelectedRangeParams(apiDateFilter);
    this.service.getAgeGenderData(this.campaign.masterCampaignId, breakdown, params)
      .then((response) => {
        this.ageGenderData = response.data;
      })
      .catch((error) => {
        this.ageGenderData = new Error(JSON.stringify(error));
      });
  }

  getDeviceData() {
    let breakdown = this.dataSettingsService.getSelectedBreakdownType();
    let params = this.dataSettingsService.getSelectedRangeParams(apiDateFilter);
    this.service.getDeviceData(this.campaign.masterCampaignId, breakdown, params)
      .then((response) => {
        this.deviceData = response.data;
      })
      .catch((error) => {
        this.deviceData = new Error(JSON.stringify(error));
      });
  }

  getPerformanceData() {
    let breakdown = this.dataSettingsService.getSelectedBreakdownType();
    let params = this.dataSettingsService.getSelectedRangeParams(apiDateFilter);
    this.service.getPerformanceData(this.campaign.masterCampaignId, breakdown, params)
      .then((response) => {
        this.performanceData = response.data;
      })
      .catch((error) => {
        this.performanceData = new Error(JSON.stringify(error));
      });
  }
}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignOverview: '<',
  }
};
