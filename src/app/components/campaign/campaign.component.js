import template from './campaign.html';


class Controller {
  constructor(CampaignSidebar, $stateParams, rlDateTime, DataSettings) {
    'ngInject';
    this.header = {};
    this.sidebar = CampaignSidebar;
    this.DataSettings = DataSettings;
    this.DateTime = rlDateTime;
    this.mcid = $stateParams.mcid;
    this.badId = false;
    this.selectedSettings = null;
  }

  $onInit() {
    this.cycles = mapCycles(this.DateTime, this.campaignCycles);
    this.campaignDataSettings = this.DataSettings.initialize(this.cycles, this.mcid);
    this.header = setHeader(this.campaignOverview);
  }

  isError(data) {
    let object = data || this.campaignOverview;
    return object instanceof Error;
  }

  handleSidebarToggle(status) {
    this.sidebar.collapsed = status;
  }

  handleUpdateDataSettings(settings) {
    this.DataSettings.selectRange(settings);
    this.campaignDataSettings = this.DataSettings.getSelectedSettings();
  }
}

// Private Functions
function mapCycles(DateTime, cycles) {
  return {
    currentCycleIndex: cycles.currentCycleIndex,
    cycles: cycles.cycles.map((cycle) => {
      return angular.extend({}, cycle, {
        dateRange: getDateRange(cycle),
        startDateObj: DateTime.newDate(cycle.startDate),
        endDateObj: DateTime.newDate(cycle.endDate),
        cycleNumberStr: 'Cycle ' + cycle.cycleNumber
      });
    })
  };
}

function getDateRange(cycle) {
  let range = cycle.startDate || '-/-/-';
  range += ' to ';
  range += cycle.endDate || '-/-/-';
  return range;
}

function setHeader(overview) {
  return {
    type: 'Campaign',
    title: overview.name,
    subType: 'Advertiser',
    subTitle: overview.advertiserName,
    columns: [{
      title: 'Advertiser',
      rows: [{
        name: 'Advertiser Name',
        value: overview.advertiserName,
        link: `advertiser.detail({maid:${overview.masterAdvertiserId}})`
      }, {
        name: 'Master Advertiser ID',
        value: overview.masterAdvertiserId
      }, {
        name: 'Current Advertiser ID',
        value: overview.currentAdvertiserId
      }, {
        name: 'Advertiser Business',
        value: overview.businessId
      }]
    }, {
      title: 'Campaign',
      rows: [{
        name: 'Master Campaign ID',
        value: overview.masterCampaignId
      }, {
        name: 'Current Campaign ID',
        value: overview.activeCampaignId
      }, {
        name: 'Offer Name',
        value: overview.offerName
      }, {
        name: 'Offer ID',
        value: overview.offerId
      }, {
        name: 'Business Category',
        value: overview.businessCategoryName
      }, {
        name: 'Business Sub Category',
        value: overview.businessSubCategoryName
      }]
    }]
  };
}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignCycles: '<',
    campaignOverview: '<'
  }
};
