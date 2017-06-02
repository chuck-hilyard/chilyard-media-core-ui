import ngMockE2E from 'angular-mocks/ngMockE2E';
import performanceData from './performance-data/performance-data';


export default angular
  .module('mocks.campaign.getPerformance', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaign\/123456\/cycle\?dates=[0-9]{4}-[0-9]{2}-[0-9]{2},[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
      .respond(performanceData);

  })
  .name;
