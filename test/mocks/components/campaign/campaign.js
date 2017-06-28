import getCycles from './campaign.get-cycles';
import getPerformance from './campaign.get-performance';
import getTrend from './campaign.get-trend';
import getOverview from './campaign.get-overview'

export default angular
  .module('mocks.campaign', [
    getCycles,
    getPerformance,
    getTrend,
    getOverview
  ])
  .name;
