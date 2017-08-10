import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './gmcid';
import data1000020 from './gmcid1000020';

export default angular
  .module('mocks.campaign.gmcid', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\?platform=USA&q=1000020/)
      .respond(200, data1000020);

    $httpBackend
      .when('GET', /\/campaigns\?platform=USA&q=\d+/)
      .respond(200, data);
  })
  .name;
