import mocks from './campaign.mocks';

describe('components.campaign', () => {

  let $ctrl;

  beforeEach(() => {

    angular.mock.module('campaign', ($provide) => {
      $provide.value('CampaignSidebar', mocks);
    });

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('campaign');
    });
  });

  it('constructs', () => {
    expect($ctrl.sidebar).toEqual(mocks);
  });

});
