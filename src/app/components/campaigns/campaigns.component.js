import template from './campaigns.html';


class Controller {

  constructor(CampaignService) {
    'ngInject';
    this.rows = [];
    this.service = CampaignService;
  }

  search() {
    if (!this.searchInput || this.searchInput.length === 0) {
      this.rows = [];
    }
    this.service.getCampaignOverview(this.searchInput)
      .then((success) => {
        this.rows = [
          success.data
        ];
      });
  }

}

export default {
  template: template,
  controller: Controller
};
