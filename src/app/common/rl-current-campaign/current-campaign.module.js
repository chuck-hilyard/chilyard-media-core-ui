import service from './current-campaign.service.js';

export default angular
  .module('common.current-campaign', [])
  .service('rlCurrentCampaign', service)
  .name;
