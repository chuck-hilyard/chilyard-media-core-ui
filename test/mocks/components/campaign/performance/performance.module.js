import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './performance';


export default angular
  .module('mocks.campaign.performance', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/stats\/cycles\?end=\d+\&start=\d+$/)
      .respond(data);

  })
  .name;
