import template from './campaign.html';

class Controller {
  constructor(CampaignSidebar, $stateParams) {
    'ngInject';
    this.header = {};
    this.sidebar = CampaignSidebar;
    this.mcid = $stateParams.mcid;
  }

  $onInit() {
    this.campaign = this.campaignOverview;
    this.cycles  = this.campaignCycles;
    this.header = setHeader(this.campaignOverview);
  }

  handleSidebarToggle(status) {
    this.sidebar.collapsed = status;
  }
}

// Private Functions

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
        value: overview.currentAdvertiserId,
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
