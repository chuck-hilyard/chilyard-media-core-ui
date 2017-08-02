import template from './campaign.html';
const me = 'Campaign Controller';

class Controller {
  constructor(rlLogger, CampaignSidebar, $stateParams, $translate, rlDateTime, DataSettings) {
    'ngInject';
    this.Logger = rlLogger;
    this.sidebar = CampaignSidebar;
    this.DataSettings = DataSettings;
    this.DateTime = rlDateTime;

    this.to = $translate.instant('app.to');
    this.cycleString = $translate.instant('app.cycle');
    this.translatedTitles = setTitles($translate);
    this.mcid = $stateParams.mcid;
    this.cycles = null;
    this.campaignDataSettings = {};
    this.header = {};
  }

  $onInit() {
    this.Logger.trace('$onInit', {
      campaignCycles: this.campaignCycles,
      campaignOverview: this.campaignOverview
    }, me);

    if (!this.isError()) {
      this.cycles = mapCycles(this.DateTime, this.campaignCycles, this.cycleString, this.to);
      this.campaignDataSettings = this.DataSettings.initialize(this.cycles, this.mcid);
      this.header = setHeader(this.campaignOverview, this.translatedTitles);
    }

    this.Logger.trace('$onInit complete', {
      cycles: this.cycles,
      campaignDataSettings: this.campaignDataSettings,
      header: this.header
    }, me);
  }

  isError() {
    if (this.campaignOverview instanceof Error) {
      return true;
    }
    if (this.campaignCycles instanceof Error) {
      return true;
    }
    if (this.campaignOverview.masterCampaignId !== parseInt(this.mcid)) {
      return true;
    }
    return false;
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
function mapCycles(DateTime, cycles, cycleString, toString) {
  return {
    currentCycleIndex: cycles.currentCycleIndex,
    cycles: cycles.cycles.map((cycle) => {
      return angular.extend({}, cycle, {
        dateRange: getDateRange(cycle, toString),
        startDateObj: DateTime.newDate(cycle.startDate),
        endDateObj: DateTime.newDate(cycle.endDate),
        cycleNumberStr: cycleString + ' ' + cycle.cycleNumber
      });
    })
  };
}

function getDateRange(cycle, toString) {
  let range = cycle.startDate || '-/-/-';
  range += ' ' + toString + ' ';
  range += cycle.endDate || '-/-/-';
  return range;
}

function setHeader(overview, titles) {
  return {
    type: titles.campaign,
    title: overview.name,
    subType: titles.advertiser,
    subTitle: overview.advertiserName,
    columns: [{
      title: titles.advertiser,
      rows: [{
        name: titles.advertiserName,
        value: overview.advertiserName,
        link: `advertiser.detail({maid:${overview.masterAdvertiserId}})`
      }, {
        name: titles.masterAdvertiserId,
        value: overview.masterAdvertiserId
      }, {
        name: titles.currentAdvertiserId,
        value: overview.currentAdvertiserId
      }, {
        name: titles.businessId,
        value: overview.businessId
      }]
    }, {
      title: titles.campaign,
      rows: [{
        name: titles.masterCampaignId,
        value: overview.masterCampaignId
      }, {
        name: titles.activeCampaignId,
        value: overview.activeCampaignId
      }, {
        name: titles.offerName,
        value: overview.offerName
      }, {
        name: titles.offerId,
        value: overview.offerId
      }, {
        name: titles.businessCategoryName,
        value: overview.businessCategoryName
      }, {
        name: titles.businessSubCategoryName,
        value: overview.businessSubCategoryName
      }]
    }]
  };
}

function setTitles(translate) {
  return {
    campaign: translate.instant('campaign.campaign'),
    advertiser: translate.instant('campaign.advertiser'),
    advertiserName: translate.instant('campaign.advertiserName'),
    masterAdvertiserId: translate.instant('campaign.masterAdvertiserId'),
    currentAdvertiserId: translate.instant('campaign.currentAdvertiserId'),
    businessId: translate.instant('campaign.businessId'),
    masterCampaignId: translate.instant('campaign.masterCampaignId'),
    activeCampaignId: translate.instant('campaign.activeCampaignId'),
    offerName: translate.instant('campaign.offerName'),
    offerId: translate.instant('campaign.offerId'),
    businessCategoryName: translate.instant('campaign.businessCategoryName'),
    businessSubCategoryName: translate.instant('campaign.businessSubCategoryName')
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
