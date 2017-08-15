// Campaign level mocks
import commonMocks from '../../../../../test/mocks/common/common.mocks';
import mockSocialCampaignOverview from '../../../../../test/mocks/components/campaign/overview/overview';
import mockSearchCampaignOverview from '../../../../../test/mocks/components/campaign/overview/overview1000020';
import mockDataSettings from '../mock-data/mock-data-settings';


describe('components.campaign.detail', () => {
  let $ctrl, $q, service;

  let MockChange = new commonMocks.StubChanges()
    .addInitialChange('campaignOverview', mockSocialCampaignOverview)
    .addInitialChange('currentDataSettings', mockDataSettings)
    .build();

  beforeEach(() => {
    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', {});
      $provide.value('rlApi', commonMocks.api);
      $provide.value('rlLogger', commonMocks.logger);
    });

    angular.mock.inject(($injector) => {
      $q = $injector.get('$q');
      let $componentController = $injector.get('$componentController');
      service = $injector.get('CampaignDetailService');
      $ctrl = $componentController('campaign.detail');
    });

    spyOn(service, 'getPerformanceData').and.returnValue($q.when());
    spyOn(service, 'getAgeGenderData').and.returnValue($q.when());
    spyOn(service, 'getDeviceData').and.returnValue($q.when());
  });

  afterEach(() => {
    $ctrl = null;
  });

  it('constructs', () => {
    let moduleSettings = {
      ageGender: false,
      device: false,
      performance: false
    };
    expect($ctrl.ageGenderData).toBeNull();
    expect($ctrl.campaign).toBeNull();
    expect($ctrl.dataSettings).toBeNull();
    expect($ctrl.deviceData).toBeNull();
    expect($ctrl.loading).toEqual(moduleSettings);
    expect($ctrl.performanceData).toBeNull();
    expect($ctrl.supported).toEqual(moduleSettings);
    expect($ctrl.service).toEqual(service);
  });

  describe('$onChanges', () => {
    describe('given changes object', () => {
      it('when overview and data settings change, then it should load performance, device and age/gender data', () => {
        $ctrl.$onChanges(MockChange);
        expect($ctrl.campaign).toEqual(mockSocialCampaignOverview);
        expect($ctrl.supported).toEqual({ageGender: true, device: true, performance: true});
        expect(service.getPerformanceData).toHaveBeenCalledWith(mockSocialCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
        expect(service.getAgeGenderData).toHaveBeenCalledWith(mockSocialCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
        expect(service.getDeviceData).toHaveBeenCalledWith(mockSocialCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
      });
      it('search campaign only calls supported services', () => {
        let SearchChange = new commonMocks.StubChanges()
          .addInitialChange('campaignOverview', mockSearchCampaignOverview)
          .addInitialChange('currentDataSettings', mockDataSettings)
          .build();

        $ctrl.$onChanges(SearchChange);
        expect($ctrl.campaign).toEqual(mockSearchCampaignOverview);
        expect($ctrl.supported).toEqual({ageGender: false, device: true, performance: true});
        expect(service.getPerformanceData).toHaveBeenCalledWith(mockSearchCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
        expect(service.getAgeGenderData).not.toHaveBeenCalled();
        expect(service.getDeviceData).toHaveBeenCalledWith(mockSearchCampaignOverview.masterCampaignId, mockDataSettings.breakdown, mockDataSettings.apiParams);
      });
      it('when neither overview and data settings have changed, then it should not load performance, device or age/gender data', () => {
        let BadChange = new commonMocks.StubChanges()
          .addInitialChange('somethingElse', 5)
          .build();

        $ctrl.$onChanges(BadChange);
        expect(service.getPerformanceData).not.toHaveBeenCalled();
        expect(service.getAgeGenderData).not.toHaveBeenCalled();
        expect(service.getDeviceData).not.toHaveBeenCalled();
      });
    });

    describe('loading indicators', () => {
      it('shows while waiting for promise', () => {
        let loadingLoop = (boolean) => {
          angular.forEach($ctrl.loading, (item) => {
            expect(item).toBe(boolean);
          });
        };
        loadingLoop(false);
        $ctrl.$onChanges(MockChange);
        $ctrl.getData();
        loadingLoop(true);
        expect(service.getPerformanceData).toHaveBeenCalled();
        expect(service.getAgeGenderData).toHaveBeenCalled();
        expect(service.getDeviceData).toHaveBeenCalled();
      });
    });
  });

});
