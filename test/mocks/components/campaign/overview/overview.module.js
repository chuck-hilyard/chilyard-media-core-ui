import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './overview';


export default angular
  .module('mocks.campaign.overview', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/campaign-overview$/)
      .respond(data);

  })
  .name;
