import commonMocks from '../../../../test/mocks/common/common.mocks';

describe('common.current-campaign', () => {
  let rlCurrentCampaignService;

  beforeEach(() => {
    angular.mock.module('common.current-campaign', ($provide) => {
      $provide.value('rlLogger', commonMocks.logger);
    });
    angular.mock.inject(function(rlCurrentCampaign) {
      rlCurrentCampaignService = rlCurrentCampaign;
    });
  });

  it('exists', () => {
    expect(rlCurrentCampaignService).toBeDefined();
  });

  it('constructs', () => {
    expect(rlCurrentCampaignService.mcid).toEqual('');
    expect(rlCurrentCampaignService.gmcid).toEqual('');
  });

  describe('setCampaign(mcid, gmcid)', () => {
    it('setCampaign("567", "567-33-44444" will set mcid and gmcid', () => {
      rlCurrentCampaignService.setCampaign('567', '567-33-44444');
      expect(rlCurrentCampaignService.mcid).toEqual('567');
      expect(rlCurrentCampaignService.gmcid).toEqual('567-33-44444');
    });

    it('setCampaign("567") will set mcid and clear gmcid', () => {
      rlCurrentCampaignService.setCampaign('567');
      expect(rlCurrentCampaignService.mcid).toEqual('567');
      expect(rlCurrentCampaignService.gmcid).toEqual('');
    });

    it('setCampaign() will clear mcid and clear gmcid', () => {
      rlCurrentCampaignService.setCampaign();
      expect(rlCurrentCampaignService.mcid).toEqual('');
      expect(rlCurrentCampaignService.gmcid).toEqual('');
    });
  });

  describe('clearCampaign()', () => {
    it('when mcid = "42" and gmcid="007" clearCampaign() sets both values to ""', () => {
      rlCurrentCampaignService.mcid = '42';
      rlCurrentCampaignService.gmcid = '007';
      rlCurrentCampaignService.clearCampaign();
      expect(rlCurrentCampaignService.mcid).toEqual('');
      expect(rlCurrentCampaignService.gmcid).toEqual('');
    });
  });

});
