import template from './order.html';


class Controller {
  constructor(OrderSidebar) {
    'ngInject';
    this.sidebar = OrderSidebar;
    this.header = {};
  }

  $onInit() {
    this.setHeader();
  }

  setHeader() {
    this.header = {
      type: 'Order',
      title: '123456',
      subType: 'Advertiser',
      subTitle: 'JJ\'s Plumbing',
      subLink: `advertiser.detail({maid:${this.order.data.advertiser.maid}})`,
      columns: [
        {
          title: 'Advertiser',
          rows: [
            {
              name: 'Advertiser Name',
              value: this.order.data.advertiser.name,
              link: `advertiser.detail({maid:${this.order.data.advertiser.maid}})`
            },
            {
              name: 'Master Advertiser ID',
              value: this.order.data.advertiser.maid
            },
            {
              name: 'Current Advertiser ID',
              value: this.order.data.advertiser.caid
            },
            {
              name: 'Advertiser Business',
              value: this.order.data.advertiser.business
            }
          ]
        },
        {
          title: 'Order Information',
          rows: [
            {
              name: 'Order ID',
              value: this.order.data.offer.oid
            },
            {
              name: 'Payment Type',
              value: this.order.data.offer.payment
            },
            {
              name: 'Current Budget',
              value: this.order.data.offer.budget
            },
            {
              name: 'Current Cycle',
              value: this.order.data.offer.cycle
            },
            {
              name: 'Auto Renew Type',
              value: this.order.data.offer.renew
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
    order: '<'
  }
};
