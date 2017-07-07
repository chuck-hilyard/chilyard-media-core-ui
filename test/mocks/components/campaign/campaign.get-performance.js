import ngMockE2E from 'angular-mocks/ngMockE2E';
import performanceData from './performance-data/performance-data';


export default angular
  .module('mocks.campaign.getPerformance', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/stats\/cycles\?end=\d+\&start=\d+$/)
      .respond(performanceData);

  })
  .name;
