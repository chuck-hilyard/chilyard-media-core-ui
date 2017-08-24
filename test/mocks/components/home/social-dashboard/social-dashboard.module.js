import ngMockE2E from 'angular-mocks/ngMockE2E';
import socialDashboardData from './dropdown-values';
import campaignsData from './get-campaigns';

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
      .when('GET', /\/dmc\?businessUserId=(\d)+&offerId=(\d+)&platform=USA/)
      .respond(200, socialDashboardData.facebookSpecialistDmcList);

    $httpBackend
      .when('GET', /\/advertiser\?platform=USA&businessUserId=\d+/)
      .respond(200, socialDashboardData.facebookAdvertiserList);

    $httpBackend
      .when('GET', /\/socialcampaigns/)
      .respond(200, campaignsData);
  })
  .name;
