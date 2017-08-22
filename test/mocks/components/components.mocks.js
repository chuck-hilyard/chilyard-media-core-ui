import getAdvertiser from './advertiser/get_advertiser.mocks';
import campaign from './campaign/campaign.mocks';
import getOrder from './order/get_order.mocks';
import getCampaigns from './home/search-dashboard/search-dashboard.routes';
import home from './home/home';

export default angular
  .module('mocks.components', [
    getAdvertiser,
    campaign,
    getOrder,
    getCampaigns,
    home
  ])
  .name;
