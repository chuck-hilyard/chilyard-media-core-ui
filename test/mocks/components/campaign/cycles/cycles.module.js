import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './cycles';
import shortData from './one-cycle';


export default angular
  .module('mocks.campaign.cycles', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/cycles$/)
      .respond(200, data);

  })
  .name;
