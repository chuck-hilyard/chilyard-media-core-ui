import template from './detail.html';

const apiDateFilter = 'yyyy-MM-dd';
class Controller {

  constructor($filter, $scope, CampaignDetailService, CampaignSidebar, Session) {
    'ngInject';
    // Anuglar
    this.$filter = $filter;

    // Local Vars
    this.ageGenderData = null;
    this.performanceData = null;
    this.session = Session;
    this.service = CampaignDetailService;

    // $scope.$watch(() => Session.dateRange, (newValue, oldValue) => {
    //   this.getPerformanceData();
    // }, true);

    //  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    //  this.sesson IS FPO UNTIL DATE RANGE COMPONENT IS READY
    this.session = {
      'dateRange': {
        'breakdownType': 'cycles',
        'name': 'All Cycles',
        'start': {
          'start': '2017-01-01',
          'end': '2017-01-31',
          'cycleNumber': 1,
          'cycleId': 201456
        },
        'end': {
          'start': '2017-10-01',
          'cycleNumber': 10,
          'cycleId': 456456
        }
      }
    };
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  }

  $onInit() {
    this.campaign = this.campaignOverview;
    this.getPerformanceData();
    this.getAgeGenderData();
  }

  dateToString(date) {
    return this.$filter('date')(date, apiDateFilter);
  }

  getAgeGenderData() {
    let breakdown = this.session.dateRange.breakdownType;
    let params = this.getUrlParams();
    this.service.getAgeGenderData(this.campaign.masterCampaignId, breakdown, params)
      .then((response) => {
        this.ageGenderData = response.data;
      })
      .catch((error) => {
        this.ageGenderData = new Error(JSON.stringify(error));
      });
  }

  getUrlParams() {
    let dateRange = this.session.dateRange;
    switch(dateRange.breakdownType) {
    case 'cycles': {
      let output = {
        start: dateRange.start.cycleNumber,
        end: dateRange.end.cycleNumber
      };
      return output;
    }
    }
  }

  getPerformanceData() {
    let breakdown = this.session.dateRange.breakdownType;
    let params = this.getUrlParams();
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
    campaignOverview: '<'
  }
};
