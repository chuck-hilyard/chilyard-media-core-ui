import ngMockE2E from 'angular-mocks/ngMockE2E';
import campaignsData from './campaigns';
import campaignDrilldownData from './campaign-drilldown';


export default angular
  .module('mocks.home.search-dashboard', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns/)
      .respond(200, campaignsData);

    $httpBackend
      .when('GET', /\/campaign\/drilldown/)
      .respond(200, campaignDrilldownData);
  })
  .name;
