import mockdata from '../../../../../../test/mocks/components/campaign/performance/performance';
import tooltips from './mock-data/tooltips';
import columns from './mock-data/columns';

describe('campaign.detail.performance', () => {

  let $ctrl, $sce, $scope;

  let sidebar = {
    collapsed: false
  };

  beforeEach(() => {
    angular.mock.module('campaign.detail.performance', ($provide) => {
      $provide.value('CampaignSidebar', sidebar);
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $scope = $injector.get('$rootScope').$new();
      $sce = $injector.get('$sce');
      $ctrl = $componentController('campaignPerformance', {
        $scope: $scope
      },{});
    });
    $ctrl.delegate = {
      rebuild: angular.noop,
      resize: angular.noop
    };
    $scope.$digest();
  });

  it('constructs', () => {
    expect($ctrl.columns).toEqual([]);
    expect($ctrl.sortState).toEqual({});
    angular.forEach($ctrl.tooltips, (value, key) => {
      expect($sce.getTrustedHtml(value)).toBe(tooltips[key]);
    });
  });

  xit('configure table', () => {
    spyOn($ctrl.delegate, 'rebuild');
    let changes = {
      data: {
        currentValue: mockdata
      }
    };
    $ctrl.$onChanges(changes);
    expect($ctrl.columns).toEqual(columns);
    expect($ctrl.delegate.rebuild).toHaveBeenCalled();
  });

  it('watches CampaignSidebar', () => {
    spyOn($ctrl.delegate, 'resize');
    sidebar.collapsed = true;
    $scope.$digest();
    expect($ctrl.delegate.resize).toHaveBeenCalled();
  });

});
