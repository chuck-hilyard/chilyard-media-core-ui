import ngMockE2E from 'angular-mocks/ngMockE2E';
import campaignsData from './campaigns';
import campaignDrilldownData from './campaign-drilldown';
import dropdownData from './dropdown-values';


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

    $httpBackend
      .when('GET', /\/campaign-professional\?platform=USA/)
      .respond(200, dropdownData.campaignProfessionals);

    $httpBackend
      .when('GET', /\/campaign-professional\?businessUserId=(\d+)&platform=USA/)
      .respond(200, dropdownData.dmc);
  })
  .name;
