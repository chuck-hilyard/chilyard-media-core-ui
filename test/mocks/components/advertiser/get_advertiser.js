import angular from 'angular';
import ngMockE2E from 'angular-mocks/ngMockE2E';


export default angular
  .module('mocks.advertiser.get', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/advertiser\/123456$/)
      .respond({
        advertiser: {
          name: 'JJ\'s Plumbing',
          maid: 23456,
          caid: 56978,
          business: 14785
        },
        order: {
          oid: 123456,
          payment: 'Credit Card',
          budget: 1500,
          cycle: '7 of 9',
          renew: 'On-Immediately'
        }
      });
  })
  .name;
