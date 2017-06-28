import template from './campaign.html';

// Private
let setHeader = setHeader;

class Controller {
  constructor(CampaignSidebar) {
    'ngInject';
    this.header = {};
    this.sidebar = CampaignSidebar;
  }

  $onInit() {
    this.campaign = this.campaignOverview.data;
    this.header = setHeader(this.campaignOverview.data);
  }

  handleSidebarToggle(status) {
    this.sidebar.collapsed = status;
  }
}

function setHeader(overview) {
  return {
    type: 'Campaign',
    title: overview.name,
    subType: 'Advertiser',
    subTitle: overview.advertiserName,
    subLink: `advertiser.detail({maid:${overview.masterAdvertiserId}})`,
    columns: [
      {
        title: 'Advertiser',
        rows: [
          {
            name: 'Advertiser Name',
            value: overview.advertiserName,
            link: `advertiser.detail({maid:${overview.masterAdvertiserId}})`
          },
          {
            name: 'Master Advertiser ID',
            value: overview.masterAdvertiserId
          },
          {
            name: 'Current Advertiser ID',
            value: overview.currentAdvertiserId,
          },
          {
            name: 'Advertiser Business',
            value: overview.businessId
          }
        ]
      },
      {
        title: 'Campaign',
        rows: [
          {
            name: 'Master Campaign ID',
            value: overview.masterCampaignId
          },
          {
            name: 'Current Campaign ID',
            value: overview.activeCampaignId
          },
          {
            name: 'Offer Name',
            value: overview.offerName
          },
          {
            name: 'Offer ID',
            value: overview.offerId
          },
          {
            name: 'Business Category',
            value: overview.businessCategoryName
          },
          {
            name: 'Business Sub Category',
            value: overview.businessSubCategoryName
          }
        ]
      },
      {
        title: 'Order Information',
        rows: [
          {
            name: 'Order ID',
            value: overview.oid,
            link: `order.detail({oid:${overview.oid}})`
          },
          {
            name: 'Payment Type',
            value: overview.payment
          },
          {
            name: 'Current Budget',
            value: overview.budget
          },
          {
            name: 'Current Cycle',
            value: overview.cycle
          },
          {
            name: 'Auto Renew Type',
            value: overview.renew
          }
        ]
      }
    ]
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
