import ngMockE2E from 'angular-mocks/ngMockE2E';
import socialDashboardData from './dropdown-values';

export default angular
  .module('mocks.home.social-dashboard', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/specialist\?platform=USA/)
      .respond(200, socialDashboardData.facebookSpecialistList);

    $httpBackend
      .when('GET', /\/offers\?businessUserId=\d+&platform=USA/)
      .respond(200, socialDashboardData.facebookOfferList);

    $httpBackend
      .when('GET', /\/dmc\?platform=USA&businessUserId=\d+/)
      .respond(200, socialDashboardData.facebookSpecialistDmcList);

    $httpBackend
      .when('GET', /\/advertiser\?platform=USA&businessUserId=\d+/)
      .respond(200, socialDashboardData.facebookAdvertiserList);
  })
  .name;
