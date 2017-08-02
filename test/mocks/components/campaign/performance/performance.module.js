import ngMockE2E from 'angular-mocks/ngMockE2E';
import cycleData from './cycles';
import monthsData from './months';

export default angular
  .module('mocks.campaign.performance', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/performance-stats\/cycles\?end=\d+\&start=\d+$/)
      .respond(200, cycleData);

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/performance-stats\/months\?end=\d{4}-\d{2}\&start=\d{4}-\d{2}$/)
      .respond(200, monthsData );

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/performance-stats\/days\?end=\d{4}-\d{2}-\d{2}\&start=\d{4}-\d{2}-\d{2}$/)
      .respond(500, {
        headers: {
          correlationid: 1234,
          date: new Date()
        }
      });

  })
  .name;
