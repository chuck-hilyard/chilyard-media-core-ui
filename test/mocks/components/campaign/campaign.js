import getCycles from './campaign.get-cycles';
import getPerformance from './campaign.get-performance';
import getOverview from './campaign.get-overview';
import getAgeGender from './campaign.get-age-gender';


export default angular
  .module('mocks.campaign', [
    getCycles,
    getPerformance,
    getOverview,
    getAgeGender
  ])
  .name;
