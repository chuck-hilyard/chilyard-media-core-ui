import ngMockE2E from 'angular-mocks/ngMockE2E';
import overviewData from './overview/overview';


export default angular
  .module('mocks.campaign.getCampaignOverview', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/campaign-overview$/)
      .respond(overviewData);

  })
  .name;
