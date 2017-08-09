import template from './search-dashboard.html';


class Controller {

  constructor() {
    'ngInject';
  }

  $onInit() {
  }

  changeDashboardTheme(newTheme) {
    return newTheme; // return the variable because the campaign listing is not done
    // TODO: implement the theme change logic when the campaign listing table is done
  }

}

export default {
  template: template,
  controller: Controller
};
