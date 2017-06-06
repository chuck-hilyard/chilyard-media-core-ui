import mocks from './detail.mocks';


describe('components.campaign.detail', () => {

  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign.detail', ($provide) => {
      $provide.value('CampaignSidebar', mocks);
      $provide.value('CampaignTrendChart', {});
      $provide.value('Session', {});
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('campaign.detail');
    });
  });

  it('constructs', () => {
    expect($ctrl.gridData).toEqual({});
    expect($ctrl.sortState).toEqual({});
    expect($ctrl.tableDelegate).toEqual({});


    /*
    this.metrics = this.setMetrics();
    this.session = Session;
    this.service = CampaignDetailService;

    */
  });

});
