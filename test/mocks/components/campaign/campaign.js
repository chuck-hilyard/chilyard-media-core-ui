import get from './campaign.get';
import getPerformance from './campaign.get-performance';
import getTrend from './campaign.get-trend';

export default angular
  .module('mocks.campaign', [
    get,
    getPerformance,
    getTrend
  ])
  .name;
