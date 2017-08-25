import dropdownValues from '../../../../../test/mocks/components/home/social-dashboard/dropdown-values';
import commonMocks from '../../../../../test/mocks/common/common.mocks';
import campaignList from '../../../../../test/mocks/components/home/social-dashboard/get-campaigns';

describe('components.home.social-dashboard', () => {

  let $ctrl, $scope, $q;

  beforeEach(() => {
    angular.mock.module('socialDashboard');
    angular.mock.module(($provide) => {
      $provide.service('MultiFilterSettingsService', function() {
        this.build = angular.noop;
        this.parseAdditional = angular.noop;
      });
      $provide.service('SocialDashboardService', function() {
        this.getChannelList = function() {
          return {data: dropdownValues.channelList};
        };
        this.getFacebookSpecialistList = function() {
          return dropdownValues.facebookSpecialistList;
        };
        this.getFacebookOfferList = function() {
          return $q.resolve(dropdownValues.facebookOfferList);
        };
        this.getFacebookSpecialistDmcList = function() {
          return $q.resolve(dropdownValues.facebookSpecialistDmcList);
        };
        this.getCampaignList = function() {
          return $q.resolve(campaignList);
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
    expect($ctrl.colorScheme).toEqual('scheme1');
    expect($ctrl.filteredData).toEqual([]);
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

  it('changes dashboard theme', () => {
    expect($ctrl.colorScheme).toEqual('scheme1');
    $ctrl.changeDashboardTheme('newScheme');
    expect($ctrl.colorScheme).toEqual('newScheme');
  });

  it('returns proper indicator', () => {
    expect($ctrl.getIndicator(1)).toEqual('red-indicator');
    expect($ctrl.getIndicator(2)).toEqual('yellow-indicator');
    expect($ctrl.getIndicator(3)).toEqual('green-indicator');
    expect($ctrl.getIndicator('different')).toEqual('grey-indicator');
  });

  it('returns proper flag indicator', () => {
    expect($ctrl.getFlagIndicator(true)).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator(1)).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator('string')).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator(undefined)).toEqual('green-indicator');
    expect($ctrl.getFlagIndicator(false)).toEqual('red-indicator');
    expect($ctrl.getFlagIndicator(0)).toEqual('red-indicator');
  });
});
