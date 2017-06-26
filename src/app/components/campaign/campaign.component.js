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
    this.advertiser = this.campaignRequest.data.advertiser;
    this.campaign = this.campaignRequest.data.campaign;
    this.order = this.campaignRequest.data.order;
    this.header = setHeader(this.campaignOverview.data, this.order);
  }

  handleSidebarToggle(status) {
    this.sidebar.collapsed = status;
  }
}

function setHeader(overview, order ) {
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
            value: order.oid,
            link: `order.detail({oid:${order.oid}})`
          },
          {
            name: 'Payment Type',
            value: order.payment
          },
          {
            name: 'Current Budget',
            value: order.budget
          },
          {
            name: 'Current Cycle',
            value: order.cycle
          },
          {
            name: 'Auto Renew Type',
            value: order.renew
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
    campaignRequest: '<',
    campaignOverview: '<'
  }
};
