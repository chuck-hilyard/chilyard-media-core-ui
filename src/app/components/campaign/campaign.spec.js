import mockCampaignOverview from '../../../../test/mocks/components/campaign/overview/overview';
import mockCampaignCycles from '../../../../test/mocks/components/campaign/cycles/cycles';
import mockCampaignGmcid from '../../../../test/mocks/components/campaign/gmcid/gmcid';
import commonMocks from '../../../../test/mocks/common/common.mocks';

describe('components.campaign', () => {
  let mockDateTime = {
    newDate: () => new Date()
  };
  let mockDataSettings = {
    initialize: angular.noop,
    selectRange: angular.noop,
    getSelectedSettings: angular.noop
  };
  let mockTranslate = {
    instant: angular.noop
  };
  let mockCurrentCampaign = {
    setCampaign: angular.noop,
    clearCampaign: angular.noop
  };
  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign', ($provide) => {
      $provide.value('DataSettings', mockDataSettings);
      $provide.value('rlLogger', commonMocks.logger);
      $provide.value('rlDateTime', mockDateTime);
      $provide.value('rlCurrentCampaign', mockCurrentCampaign);
    });

    let bindings = {
      campaignCycles: mockCampaignCycles,
      campaignOverview: mockCampaignOverview,
      campaignGmcid: mockCampaignGmcid
    };

    angular.mock.inject(($injector) => {
      let stateParams = {
        mcid: '1842601'
      };
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('campaign', {
        $stateParams: stateParams,
        $translate: mockTranslate
      }, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.sidebar).toBeDefined();
  });

  describe('$onInit', () => {
    describe('given no api errors', () => {
      it('should get the campaign overview and cycle data', () => {
        $ctrl.$onInit();
        expect($ctrl.campaignOverview).toEqual(mockCampaignOverview);
        expect($ctrl.mcid).toEqual('1842601');
        expect($ctrl.campaignOverview.masterCampaignId).toEqual(1842601);
        expect($ctrl.campaignOverview instanceof Error).toBeFalsy();
        expect($ctrl.campaignCycles).toEqual(mockCampaignCycles);
        expect($ctrl.campaignCycles instanceof Error).toBeFalsy();
        expect($ctrl.campaignOverview.masterCampaignId + '').toEqual($ctrl.mcid);
      });
      it('should initialize the cycles object', () => {
        $ctrl.$onInit();
        expect($ctrl.cycles.currentCycleIndex).toEqual(mockCampaignCycles.currentCycleIndex);
        expect($ctrl.cycles.cycles[0].dateRange).toBeDefined();
        expect($ctrl.cycles.cycles[0].cycleNumberStr).toBeDefined();
        expect(typeof($ctrl.cycles.cycles[0].cycleNumberStr)).toEqual('string');
        expect($ctrl.cycles.cycles[2].dateRange).toBeDefined();
        expect($ctrl.cycles.cycles[2].startDate).toBeDefined();
        expect($ctrl.cycles.cycles[2].startDateObj).toBeDefined();
        expect($ctrl.cycles.cycles[2].endDateObj).toBeDefined();
      });
      it('should initialize the data settings values', () => {
        spyOn(mockDataSettings, 'initialize');
        $ctrl.$onInit();
        expect(mockDataSettings.initialize).toHaveBeenCalled();
      });
      it('should initialize the header values', () => {
        $ctrl.$onInit();
        expect($ctrl.header.title).toEqual(mockCampaignOverview.name);
        expect($ctrl.header.subTitle).toEqual(mockCampaignOverview.advertiserName);
      });
      it('should set the CurrentCampaign', () => {
        spyOn(mockCurrentCampaign, 'setCampaign');
        $ctrl.$onInit();
        expect(mockCurrentCampaign.setCampaign).toHaveBeenCalled();
      });
      it('should set sidebar for campaign', () => {
        $ctrl.$onInit();
        expect($ctrl.publisherTypes).toEqual(['DEFAULT', 'SOCIAL']);
        let expectedLinks = [{
          translateKey: 'campaign.overview',
          state: 'campaign.detail',
          icon: 'fa-folder',
          order: 0,
          capabilities: ['DEFAULT'],
          children: []
        }];
        expect($ctrl.sidebar.links).toEqual(expectedLinks);
      });
    });
  });

  describe('$onDestroy', () => {
    it('clears the current campaign', () => {
      spyOn(mockCurrentCampaign, 'clearCampaign');
      $ctrl.$onDestroy();
      expect(mockCurrentCampaign.clearCampaign).toHaveBeenCalled();
    });
  });

  describe('handleSidebarToggle', () => {
    it('collapses sidebar', () => {
      $ctrl.handleSidebarToggle(true);
      expect($ctrl.sidebar.collapsed).toBeTruthy();
    });
    it('expands sidebar', () => {
      $ctrl.handleSidebarToggle(false);
      expect($ctrl.sidebar.collapsed).toBeFalsy();
    });
  });

  describe('handleUpdateDataSettings', () => {
    it('updates the selected range', () => {
      spyOn(mockDataSettings, 'selectRange');
      spyOn(mockDataSettings, 'getSelectedSettings');
      $ctrl.handleUpdateDataSettings({
        data: 'fakeData'
      });
      expect(mockDataSettings.selectRange).toHaveBeenCalled();
      expect(mockDataSettings.getSelectedSettings).toHaveBeenCalled();
    });
  });

});
