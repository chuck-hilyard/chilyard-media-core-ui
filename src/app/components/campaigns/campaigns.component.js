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
        this.rows = [success];
      });
  }

}

export default {
  template: template,
  controller: Controller
};
