import template from './sidebar.html';


class Controller {

  constructor($cookies, $rootScope, $state) {
    'ngInject';
    this.accordion = [];
    this.collapsed = false;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
    this.$state = $state;
  }

  $onInit() {
    let cookie = this.$cookies.get('sidebar');
    this.collapsed = (cookie === 'true') ? true : false;
    angular.forEach(this.links, (link) => {
      let accordionCollapse = !this.$state.$current.name.includes(link.state);
      this.accordion.push(accordionCollapse);
    });
  }

  accordionToggle(event, index) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.accordion[index] = !this.accordion[index];
  }

  sidebarToggle() {
    this.$rootScope.$broadcast('sidebar-toggle');
    this.collapsed = !this.collapsed;
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 365);
    this.$cookies.put('sidebar', this.collapsed, {expires: expireDate});
  }
}

export default {
  bindings: {
    links: '<'
  },
  template: template,
  controller: Controller
};
