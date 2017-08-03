import template from './home.html';


class Controller {

  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  $onInit() {
  }

  // Dashboard state checker
  // @return bool
  //
  get tabIndex() {
    this.tabIndexValue = this.$state.current.name.indexOf('search') > -1 ? 0 : 1;
    return this.tabIndexValue;
  }

  set tabIndex(index) {
  }
}

export default {
  template: template,
  controller: Controller
};
