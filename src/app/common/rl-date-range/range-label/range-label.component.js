import Template from './range-label.html';

class Controller {
  constructor(DateRangeService) {
    'ngInject';
    this.service = DateRangeService;
  }
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    range: '<'
  }
};
