import template from './campaign.html';


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
    this.setHeader();
  }

  setHeader() {
    this.header = {
      type: 'Campaign',
      title: 'My Campaign 01',
      subType: 'Advertiser',
      subTitle: 'JJ\'s Plumbing',
      subLink: `advertiser.detail({maid:${this.advertiser.maid}})`,
      columns: [
        {
          title: 'Advertiser',
          rows: [
            {
              name: 'Advertiser Name',
              value: this.advertiser.name,
              link: `advertiser.detail({maid:${this.advertiser.maid}})`
            },
            {
              name: 'Master Advertiser ID',
              value: this.advertiser.maid
            },
            {
              name: 'Current Advertiser ID',
              value: this.advertiser.caid,
            },
            {
              name: 'Advertiser Business',
              value: this.advertiser.business
            }
          ]
        },
        {
          title: 'Campaign',
          rows: [
            {
              name: 'Master Campaign ID',
              value: this.campaign.mcid
            },
            {
              name: 'Current Campaign ID',
              value: this.campaign.ccid
            },
            {
              name: 'Offer Name',
              value: this.campaign.offerName
            },
            {
              name: 'Offer ID',
              value: this.campaign.offerId
            },
            {
              name: 'Business Category',
              value: this.campaign.category
            },
            {
              name: 'Business Sub Category',
              value: this.campaign.subCategory
            }
          ]
        },
        {
          title: 'Order Information',
          rows: [
            {
              name: 'Order ID',
              value: this.order.oid,
              link: `order.detail({oid:${this.order.oid}})`
            },
            {
              name: 'Payment Type',
              value: this.order.payment
            },
            {
              name: 'Current Budget',
              value: this.order.budget
            },
            {
              name: 'Current Cycle',
              value: this.order.cycle
            },
            {
              name: 'Auto Renew Type',
              value: this.order.renew
            }
          ]
        }
      ]
    };
  }

  handleSidebarToggle(status) {
    this.sidebar.collapsed = status;
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignRequest: '<'
  }
};
