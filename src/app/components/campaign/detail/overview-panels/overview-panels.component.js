import template from './overview-panels.html';

class Controller {

  constructor() {
    'ngInject';
  }

}

export default {
  template: template,
  controller: Controller,
  bindings: {
    data: '<'
  }
};
