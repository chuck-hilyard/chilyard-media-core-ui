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
      .respond(data);

  })
  .name;
