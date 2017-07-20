import mockdata from '../../../../../../test/mocks/components/campaign/performance/cycles';
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
      let locals = {
        $scope: $scope
      };
      let bindings = {
        breakdownType: 'cycles'
      };
      $ctrl = $componentController('campaignPerformance', locals, bindings);
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
    expect($ctrl.breakdownLabel).toBe('');
    angular.forEach($ctrl.tooltips, (value, key) => {
      expect($sce.getTrustedHtml(value)).toBe(tooltips[key]);
    });
  });

  it('$onInit', () => {
    $ctrl.$onInit();
    expect($ctrl.breakdownLabel).toBe('campaignDetails.cycles');
  });

  describe('user changes breakdown type', () => {
    it('updates label', () => {
      $ctrl.$onChanges({
        breakdownType: {
          currentValue: 'months'
        }
      });
      expect($ctrl.breakdownLabel).toBe('campaignDetails.monthly');
    });
  });

  describe('data binding changes', () => {
    it('configures the table', () => {
      spyOn($ctrl.delegate, 'rebuild');
      let changes = {
        data: {
          currentValue: mockdata
        }
      };
      $ctrl.$onChanges(changes);
      expect($ctrl.columns).toEqual(columns);
      // First change doesn't call rebuild
      expect($ctrl.delegate.rebuild).not.toHaveBeenCalled();
      $ctrl.$onChanges(changes);
      // Subsequent changes call rebuild
      expect($ctrl.delegate.rebuild).toHaveBeenCalled();
    });
  });

  describe('sidebar toggles', () => {
    it('rebuilds the table', () => {
      spyOn($ctrl.delegate, 'resize');
      sidebar.collapsed = true;
      $scope.$digest();
      expect($ctrl.delegate.resize).toHaveBeenCalled();
    });
  });

  describe('users sorts column', () => {
    it('reorders data objects', () => {
      $ctrl.data = mockdata;
      $ctrl.handleSort({
        key: 'tableLabel',
        desc: true
      });
      let expected = 1;
      angular.forEach($ctrl.data, (item) => {
        expect(item.cycleNumber).toBe(expected);
        expected++;
      });
    });
  });

  describe('data is error', () => {
    it('shows error message', () => {
      spyOn($ctrl, 'configureTable');
      $ctrl.$onChanges({
        data: {
          currentValue: new Error('this is an error')
        }
      });
      expect($ctrl.configureTable).not.toHaveBeenCalled();
    });
  });

});
