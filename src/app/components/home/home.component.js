import template from './home.html';


class Controller {

  constructor() {
    'ngInject';
    this.rows = [];
  }

  $onInit() {
    for (let i = 0; i < 25; i++) {
      this.rows.push(Math.random() * 10);
    }
  }

}

export default {
  template: template,
  controller: Controller
};
