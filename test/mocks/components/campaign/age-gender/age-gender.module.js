import ngMockE2E from 'angular-mocks/ngMockE2E';
import data from './age-gender';


export default angular
  .module('mocks.campaign.ageGender', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/age-gender-stats-summary\/cycles\?end=\d+\&start=\d+$/)
      .respond(200, data);

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/age-gender-stats-summary\/months\?end=\d{4}-\d{2}\&start=\d{4}-\d{2}$/)
      .respond(200, data);

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/age-gender-stats-summary\/days\?end=\d{4}-\d{2}-\d{2}\&start=\d{4}-\d{2}-\d{2}$/)
      .respond(500);
  })
  .name;
