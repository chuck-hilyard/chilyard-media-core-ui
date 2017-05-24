import template from './sidebar.html';


class Controller {

  constructor($cookies, $state) {
    'ngInject';
    this.accordion = [];
    this.collapsed = false;
    this.$cookies = $cookies;
    this.$state = $state;
  }

  $onInit() {
    let cookie = this.$cookies.get('sidebar');
    this.collapsed = (cookie === 'true') ? true : false;
    angular.forEach(this.links, (link) => {
      let accordionCollapse = !this.$state.$current.name.includes(link.state);
      this.accordion.push(accordionCollapse);
    });
    this.onToggle({collapsed: this.collapsed});
  }

  accordionToggle(event, index) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.accordion[index] = !this.accordion[index];
  }

  sidebarToggle() {
    this.collapsed = !this.collapsed;
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 365);
    this.$cookies.put('sidebar', this.collapsed, {expires: expireDate});
    this.onToggle({collapsed: this.collapsed});
  }
}

export default {
  bindings: {
    onToggle: '&',
    links: '<'
  },
  template: template,
  controller: Controller
};
