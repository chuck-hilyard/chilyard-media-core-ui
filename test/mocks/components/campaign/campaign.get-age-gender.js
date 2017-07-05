import ngMockE2E from 'angular-mocks/ngMockE2E';
import ageGenderData from './age-gender/age-gender';


export default angular
  .module('mocks.campaign.getAgeGender', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaigns\/\d+\/age-gender-stats-summary\/cycles\?end=\d+\&start=\d+$/)
      .respond(ageGenderData);

  })
  .name;
