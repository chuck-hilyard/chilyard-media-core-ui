import home from './home/home.module';
import advertisers from './advertisers/advertisers.module';
// import advertiser from './advertiser/advertiser.module';
import campaigns from './campaigns/campaigns.module';
import campaign from './campaign/campaign.module';
// import orders from './orders/orders.module';
// import order from './order/order.module';
// import notFound from './404/404.module';

export default angular
  .module('components', [
    home,
    advertisers,
    // advertiser,
    campaigns,
    campaign
    //orders,
    //order
  ])
  .name;
