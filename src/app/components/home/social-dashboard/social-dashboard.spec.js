import dropdownValues from '../../../../../test/mocks/components/home/social-dashboard/dropdown-values';

describe('components.home.social-dashboard', () => {

  let $ctrl, $scope, $q;

  beforeEach(() => {
    angular.mock.module('socialDashboard');
    angular.mock.module(($provide) => {
      $provide.service('SocialDashboardService', function() {
        this.getChannelList = function() {
          return {data: dropdownValues[0].channelList};
        };
        this.getFacebookSpecialistList = function() {
          return dropdownValues[0].facebookSpecialistList;
        };
        this.getFacebookOfferList = function() {
          let deferred = $q.defer();
          deferred.resolve(dropdownValues[0].facebookOfferList);
          return deferred.promise;
        };
        this.getFacebookSpecialistDmcList = function() {
          let deferred = $q.defer();
          deferred.resolve(dropdownValues[0].facebookSpecialistDmcList);
          return deferred.promise;
        };
      });

      $provide.value('fbSpecialist', dropdownValues[0].facebookSpecialistList[0]);
      $provide.value('offer', dropdownValues[0].facebookOfferList[0]);
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
    expect($ctrl.channel_values.list).toEqual(dropdownValues[0].channelList);
  });

  it('set properly list with values of fbSpeciaList dropdown', () => {
    $ctrl.loadDropdownValues();
    $scope.$apply();
    expect($ctrl.fbSpecialist_values.list).toEqual(dropdownValues[0].facebookSpecialistList);
  });

  it('set properly list with values of offerList dropdown', () => {
    $ctrl.fbSpecialistSelected(dropdownValues[0].facebookSpecialistList[0]);
    $scope.$apply();
    expect($ctrl.offer_values.list).toEqual(dropdownValues[0].facebookOfferList);
  });

  it('set properly list with values of dmcList dropdown', () => {
    $ctrl.fbSpecialist = dropdownValues[0].facebookSpecialistList[0];
    $ctrl.offerSelected(dropdownValues[0].facebookOfferList[0]);
    $scope.$apply();
    expect($ctrl.dmc_values.list).toEqual(dropdownValues[0].facebookSpecialistDmcList);
  });
});
