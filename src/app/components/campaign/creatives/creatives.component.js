import template from './creatives.html';

class Controller {

  constructor($scope, CampaignSidebar) {
    'ngInject';
    this.creatives = [];
    this.tableDelegate = {};
    this.tableOptions = {
      sideScroll: false
    };

    for(let i = 0; i < 4; i++) {
      this.creatives.push(i);
    }

    $scope.$watch(() => CampaignSidebar.collapsed, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.tableDelegate.resize();
      }
    });

  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaignRequest: '<'
  }
};
