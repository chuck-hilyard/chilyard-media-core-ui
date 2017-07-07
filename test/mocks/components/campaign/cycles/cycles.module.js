import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './cycles';


export default angular
  .module('mocks.campaign.cycles', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/cycles$/)
      .respond(data);

  })
  .name;
