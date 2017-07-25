import template from './advertiser.html';


class Controller {
  constructor(AdvertiserSidebar, DateRangeService) {
    'ngInject';
    this.dateRanges = DateRangeService.ranges;
    this.header = {};
    this.sidebar = AdvertiserSidebar;
  }

  $onInit() {
    this.setHeader();
  }

  setHeader() {
    this.header = {
      type: 'Advertiser',
      title: 'JJ\'s Plumbing',
      columns: [
        {
          title: 'Advertiser',
          rows: [
            {
              name: 'Master Advertiser ID',
              value: this.advertiser.data.advertiser.maid
            },
            {
              name: 'Current Advertiser ID',
              value: this.advertiser.data.advertiser.caid
            },
            {
              name: 'Advertiser Business',
              value: this.advertiser.data.advertiser.business
            }
          ]
        },
        {
          title: 'Order Information',
          rows: [
            {
              name: 'Order ID',
              value: this.advertiser.data.offer.oid,
              link: `order.detail({oid:${this.advertiser.data.offer.oid}})`
            },
            {
              name: 'Payment Type',
              value: this.advertiser.data.offer.payment
            },
            {
              name: 'Current Budget',
              value: this.advertiser.data.offer.budget
            },
            {
              name: 'Current Cycle',
              value: this.advertiser.data.offer.cycle
            },
            {
              name: 'Auto Renew Type',
              value: this.advertiser.data.offer.renew
            }
          ]
        }
      ]
    };
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    advertiser: '<'
  }
};
