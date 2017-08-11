import getAdvertiser from './advertiser/get_advertiser.mocks';
import campaign from './campaign/campaign.mocks';
import getOrder from './order/get_order.mocks';

export default angular
  .module('mocks.components', [
    getAdvertiser,
    campaign,
    getOrder
  ])
  .name;
