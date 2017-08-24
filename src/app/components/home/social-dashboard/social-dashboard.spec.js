import dropdownValues from '../../../../../test/mocks/components/home/social-dashboard/dropdown-values';
import commonMocks from '../../../../../test/mocks/common/common.mocks';

describe('components.home.social-dashboard', () => {

  let $ctrl, $scope, $q;

  beforeEach(() => {
    angular.mock.module('socialDashboard');
    angular.mock.module(($provide) => {
      $provide.service('SocialDashboardService', function() {
        this.getChannelList = function() {
          return {data: dropdownValues.channelList};
        };
        this.getFacebookSpecialistList = function() {
          return dropdownValues.facebookSpecialistList;
        };
        this.getFacebookOfferList = function() {
          let deferred = $q.defer();
          deferred.resolve(dropdownValues.facebookOfferList);
          return deferred.promise;
        };
        this.getFacebookSpecialistDmcList = function() {
          let deferred = $q.defer();
          deferred.resolve(dropdownValues.facebookSpecialistDmcList);
          return deferred.promise;
        };
      });
      $provide.value('rlApi', commonMocks.rlApi);
      $provide.value('rlConfig', commonMocks.config);
      $provide.value('rlLogger', commonMocks.logger);
      $provide.value('fbSpecialist', dropdownValues.facebookSpecialistList[0]);
      $provide.value('offer', dropdownValues.facebookOfferList[0]);
    });
    angular.mock.inject(($injector) => {
      $q = $injector.get('$q');
      $scope = $injector.get('$rootScope').$new();
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('socialDashboard', {
        $scope: $scope
      });
    });
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
  });

  it('set properly list with values of channel dropdown', () => {
    $ctrl.loadDropdownValues();
    $scope.$apply();
    expect($ctrl.channel_values.options.list).toEqual(dropdownValues.channelList);
  });

  it('set properly list with values of fbSpeciaList dropdown', () => {
    $ctrl.loadDropdownValues();
    $scope.$apply();
    expect($ctrl.fbSpecialist_values.options.list).toEqual(dropdownValues.facebookSpecialistList);
  });

  it('set properly list with values of offerList dropdown', () => {
    $ctrl.fbSpecialistSelected(dropdownValues.facebookSpecialistList[0]);
    $scope.$apply();
    expect($ctrl.offer_values.options.list).toEqual(dropdownValues.facebookOfferList);
  });

  it('set properly list with values of dmcList dropdown', () => {
    $ctrl.fbSpecialist = dropdownValues.facebookSpecialistList[0];
    $ctrl.offerSelected(dropdownValues.facebookOfferList[0]);
    $scope.$apply();
    expect($ctrl.dmc_values.options.list).toEqual(dropdownValues.facebookSpecialistDmcList);
  });
});
