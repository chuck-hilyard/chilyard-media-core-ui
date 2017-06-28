import ngMockE2E from 'angular-mocks/ngMockE2E';
import cycleData from './cycles/cycles';


export default angular
  .module('mocks.campaign.getCampaignCycles', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/cycles$/)
      .respond(cycleData);

  })
  .name;
