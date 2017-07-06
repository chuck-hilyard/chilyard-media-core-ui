import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './device';


export default angular
  .module('mocks.campaign.device', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/device-stats-summary\/cycles\?end=\d+\&start=\d+$/)
      .respond(data);

  })
  .name;
