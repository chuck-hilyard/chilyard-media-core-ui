import template from './device-chart.html';

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
